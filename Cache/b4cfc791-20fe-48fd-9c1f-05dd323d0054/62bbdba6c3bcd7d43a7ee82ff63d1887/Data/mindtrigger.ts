  @component
export class WebSocketReceiver extends BaseScriptComponent {
    
    @input
    targetObject: SceneObject;
    
    @input
    serverIP: string = "192.168.1.46"; // YOUR LAPTOP IP
    
    private ws: any = null;
    private originalScale: vec3;
    
    onAwake() {
        print("🔮 WebSocket Receiver starting...");
        
        if (this.targetObject) {
            this.originalScale = this.targetObject.getTransform().getLocalScale();
            print("✅ Target object assigned");
        }
        
        // Connect to your laptop's Node.js server
        this.connectToServer();
    }
    
    connectToServer() {
        try {
            const RemoteServiceModule = require("LensStudio:RemoteServiceModule");
            const serverUrl = `ws://${this.serverIP}:3000`;
            print("🌐 Connecting to: " + serverUrl);
            
            this.ws = RemoteServiceModule.createWebSocket(serverUrl);
            
            this.ws.onopen = () => {
                print("🚀 CONNECTED TO UNITY SERVER!");
            };
            
            this.ws.onmessage = (event) => {
                print("🧠 RECEIVED: " + event.data);
                
                if (event.data === "neural_event_triggered") {
                    print("⚡ NEURAL TRIGGER RECEIVED - ANIMATING!");
                    this.doAnimation();
                }
            };
            
            this.ws.onclose = () => {
                print("❌ WebSocket closed");
            };
            
            this.ws.onerror = (error) => {
                print("⚠️ WebSocket error: " + error);
            };
            
        } catch (error) {
            print("❌ Failed to create WebSocket: " + error);
        }
    }
    
    doAnimation() {
        if (!this.targetObject) return;
        
        print("🎬 DOING ANIMATION!");
        
        const transform = this.targetObject.getTransform();
        
        // Make it BIG
        const bigScale = this.originalScale.uniformScale(3.0);
        transform.setLocalScale(bigScale);
        
        // After 2 seconds, make it normal
        const shrinkEvent = this.createEvent("DelayedCallbackEvent");
        shrinkEvent.bind(() => {
            transform.setLocalScale(this.originalScale);
            print("✅ Animation complete!");
        });
        shrinkEvent.reset(2.0);
    }
    
    onDestroy() {
        if (this.ws) {
            this.ws.close();
        }
    }
}