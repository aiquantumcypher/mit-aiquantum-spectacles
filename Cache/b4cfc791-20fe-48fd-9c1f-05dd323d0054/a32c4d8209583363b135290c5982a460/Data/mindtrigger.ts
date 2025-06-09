@component
export class NeuralTrigger extends BaseScriptComponent {
    
    @input
    targetObject: SceneObject;
    
    @input
    serverIP: string = "192.168.1.46";
    
    @input 
    serverPort: number = 3000;
    
    private originalScale: vec3;
    private animating: boolean = false;
    
    onAwake() {
        print("🔮 Neural Trigger starting...");
        
        if (!this.targetObject) {
            this.targetObject = this.getSceneObject();
        }
        
        if (this.targetObject) {
            this.originalScale = this.targetObject.getTransform().getLocalScale();
            print("✅ Ready!");
        }
        
        // Start with test mode for now
        this.startTestMode();
    }
    
    startTestMode() {
        print("🧪 Test mode - colorful animation every 6 seconds");
        const testEvent = this.createEvent("DelayedCallbackEvent");
        testEvent.bind(() => {
            this.fireAnimation();
            this.startTestMode();
        });
        testEvent.reset(6.0);
    }
    
    fireAnimation() {
        if (this.animating || !this.targetObject) return;
        
        print("🧠⚡ NEURAL ANIMATION!");
        this.animating = true;
        
        const transform = this.targetObject.getTransform();
        const renderer = this.targetObject.getComponent("Component.RenderMeshVisual");
        
        if (renderer && renderer.mainMaterial) {
            const mat = renderer.mainMaterial.clone();
            
            // RED + BIG
            mat.mainPass.baseColor = new vec4(1, 0, 0, 1);
            renderer.mainMaterial = mat;
            transform.setLocalScale(this.originalScale.uniformScale(3.0));
            print("🔴 RED");
            
            // GREEN after 2 seconds
            const greenEvent = this.createEvent("DelayedCallbackEvent");
            greenEvent.bind(() => {
                mat.mainPass.baseColor = new vec4(0, 1, 0, 1);
                renderer.mainMaterial = mat;
                print("🟢 GREEN");
            });
            greenEvent.reset(2.0);
            
            // BLUE after 4 seconds  
            const blueEvent = this.createEvent("DelayedCallbackEvent");
            blueEvent.bind(() => {
                mat.mainPass.baseColor = new vec4(0, 0.5, 1, 1);
                renderer.mainMaterial = mat;
                print("🔵 BLUE");
            });
            blueEvent.reset(4.0);
            
            // RESET after 6 seconds
            const resetEvent = this.createEvent("DelayedCallbackEvent");
            resetEvent.bind(() => {
                mat.mainPass.baseColor = new vec4(0.5, 0.5, 0.5, 1);
                renderer.mainMaterial = mat;
                transform.setLocalScale(this.originalScale);
                this.animating = false;
                print("✅ DONE");
            });
            resetEvent.reset(6.0);
        }
    }
}