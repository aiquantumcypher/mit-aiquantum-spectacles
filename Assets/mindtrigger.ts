@component
export class MassiveSphere extends BaseScriptComponent {
    
    @input
    targetObject: SceneObject;
    
    @input
    serverIP: string = "192.168.1.46";
    
    private ws: any = null;
    private originalScale: vec3;
    private isAnimating: boolean = false;
    
    onAwake() {
        print("🔮 MASSIVE SPHERE STARTING...");
        
        if (this.targetObject) {
            this.originalScale = this.targetObject.getTransform().getLocalScale();
            print("✅ Original scale: " + this.originalScale.toString());
        }
        
        this.connectToServer();
        
        // TEST ANIMATION EVERY 5 SECONDS
        this.startTestAnimation();
    }
    
    startTestAnimation() {
        const testEvent = this.createEvent("DelayedCallbackEvent");
        testEvent.bind(() => {
            print("🧪 TEST ANIMATION!");
            this.makeHUGE();
            this.startTestAnimation(); // Repeat
        });
        testEvent.reset(5.0);
    }
    
    connectToServer() {
        try {
            // Try multiple ways to access RemoteServiceModule
            const serverUrl = `ws://${this.serverIP}:3000`;
            print("🌐 Connecting to: " + serverUrl);
            
            // Method 1: Try direct access
            let remoteModule = global.remoteServiceModule;
            if (!remoteModule) {
                // Method 2: Try scene access
                remoteModule = this.getSceneObject().getComponent("Component.RemoteServiceModule");
            }
            if (!remoteModule) {
                // Method 3: Try require
                remoteModule = require("LensStudio:RemoteServiceModule");
            }
            
            this.ws = remoteModule.createWebSocket(serverUrl);
            
            this.ws.onopen = (event) => {
                print("🚀 WEBSOCKET CONNECTED!");
            };
            
            this.ws.onmessage = (event) => {
                let message;
                if (event.data instanceof Blob) {
                    // Handle binary data (shouldn't happen for our text messages)
                    print("🧠 RECEIVED BINARY DATA");
                } else {
                    // Text message
                    message = event.data;
                    print("🧠 WEBSOCKET RECEIVED: " + message);
                    
                    if (message === "neural_event_triggered") {
                        print("⚡ NEURAL TRIGGER - GOING MASSIVE!");
                        this.makeHUGE();
                    }
                }
            };
            
            this.ws.onclose = (event) => {
                print("❌ WebSocket closed");
            };
            
            this.ws.onerror = (event) => {
                print("⚠️ WebSocket error");
            };
            
        } catch (error) {
            print("❌ WebSocket failed: " + error);
        }
    }
    
    makeHUGE() {
        if (!this.targetObject || this.isAnimating) return;
        
        print("🎬 MAKING SPHERE MASSIVE!");
        this.isAnimating = true;
        
        const transform = this.targetObject.getTransform();
        
        // MAKE IT FUCKING HUGE - 10X SIZE!
        const massiveScale = this.originalScale.uniformScale(10.0);
        transform.setLocalScale(massiveScale);
        
        print("📏 Scale changed to: " + massiveScale.toString());
        
        // Stay huge for 3 seconds
        const shrinkEvent = this.createEvent("DelayedCallbackEvent");
        shrinkEvent.bind(() => {
            transform.setLocalScale(this.originalScale);
            this.isAnimating = false;
            print("✅ Back to normal size");
        });
        shrinkEvent.reset(3.0);
    }
    
    onDestroy() {
        if (this.ws) {
            this.ws.close();
        }
    }
}