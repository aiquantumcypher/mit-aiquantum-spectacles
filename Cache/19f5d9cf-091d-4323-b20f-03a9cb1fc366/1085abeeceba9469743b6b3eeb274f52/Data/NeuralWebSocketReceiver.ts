@component
export class NeuralWebSocketReceiver extends BaseScriptComponent {
    
    @input
    animatedObject: SceneObject;
    
    @input
    serverIP: string = "192.168.1.46"; // CHANGE TO YOUR LAPTOP'S IP
    
    @input
    serverPort: number = 3000;
    
    private originalScale: vec3;
    private animating: boolean = false;
    private ws: any = null;
    
    onAwake() {
        print("🔮 Neural WebSocket Receiver starting...");
        
        if (this.animatedObject) {
            this.originalScale = this.animatedObject.getTransform().getLocalScale();
            print("✅ Target sphere found!");
        } else {
            print("❌ No animated object assigned!");
        }
        
        // Connect to Unity's WebSocket server
        this.connectToServer();
    }
    
    connectToServer() {
        try {
            const serverUrl = `ws://${this.serverIP}:${this.serverPort}`;
            print("🌐 Connecting to Unity server: " + serverUrl);
            
            // Use the correct Lens Studio WebSocket API
            const networkModule = require("LensStudio:NetworkModule");
            this.ws = networkModule.createWebSocket(serverUrl);
            
            this.ws.onopen = () => {
                print("🚀 ✅ Connected to Unity WebSocket server!");
                print("🧠 Ready to receive neural triggers!");
            };
            
            this.ws.onmessage = (event: any) => {
                const message = event.data;
                print("📥 Received from Unity: " + message);
                if (message === "neural_event_triggered") {
                    this.executeNeuralAnimation();
                }
            };
            
            this.ws.onclose = () => {
                print("❌ WebSocket connection closed");
                this.startTestMode();
            };
            
            this.ws.onerror = (error: any) => {
                print("❌ WebSocket error: " + error);
                this.startTestMode();
            };
            
        } catch (error) {
            print("❌ WebSocket setup failed: " + error);
            this.startTestMode();
        }
    }
    
    startTestMode() {
        print("🧪 Starting test mode - animation every 8 seconds");
        const testEvent = this.createEvent("DelayedCallbackEvent");
        testEvent.bind(() => {
            this.executeNeuralAnimation();
            this.startTestMode();
        });
        testEvent.reset(8.0);
    }
    
    executeNeuralAnimation() {
        if (this.animating || !this.animatedObject) return;
        
        print("🧠⚡ NEURAL TRIGGER - EXECUTING ANIMATION!");
        this.animating = true;
        
        const transform = this.animatedObject.getTransform();
        const renderComponent = this.animatedObject.getComponent("Component.RenderMeshVisual");
        
        if (renderComponent && renderComponent.mainMaterial) {
            const material = renderComponent.mainMaterial.clone();
            
            // Flash bright red and scale up
            material.mainPass.baseColor = new vec4(1, 0, 0, 1); // RED
            renderComponent.mainMaterial = material;
            const bigScale = this.originalScale.uniformScale(3.0);
            transform.setLocalScale(bigScale);
            
            print("🔴 RED FLASH + BIG SCALE");
            
            // Return to normal after 2 seconds
            const resetEvent = this.createEvent("DelayedCallbackEvent");
            resetEvent.bind(() => {
                material.mainPass.baseColor = new vec4(0.5, 0.5, 0.5, 1); // Gray
                renderComponent.mainMaterial = material;
                transform.setLocalScale(this.originalScale);
                this.animating = false;
                print("✅ NEURAL ANIMATION COMPLETE");
            });
            resetEvent.reset(2.0);
        }
    }
}