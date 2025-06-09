fireAnimation() {
        if (this.animating || !this.targetObject) return;
        
        print("🧠⚡ NEURAL ANIMATION!");
        this.animating = true;
        
        const transform = this.targetObject.getTransform();
        const renderer = this.targetObject.getComponent("Component.RenderMeshVisual");
        
        if (renderer) {
            // Try different color properties that work with PBR
            if (!renderer.mainMaterial) {
                renderer.mainMaterial = renderer.getMaterial(0);
            }
            
            const mat = renderer.mainMaterial.clone();
            
            // RED - try multiple color properties
            if (mat.mainPass.baseColor) mat.mainPass.baseColor = new vec4(1, 0, 0, 1);
            if (mat.mainPass.baseTexture) mat.mainPass.baseTexture = null; // Remove texture
            if (mat.mainPass["albedo"]) mat.mainPass["albedo"] = new vec4(1, 0, 0, 1);
            if (mat.mainPass["diffuseColor"]) mat.mainPass["diffuseColor"] = new vec4(1, 0, 0, 1);
            renderer.mainMaterial = mat;
            transform.setLocalScale(this.originalScale.uniformScale(1.5));
            print("🔴 RED APPLIED TO MATERIAL");
            
            // GREEN after 2 seconds
            const greenEvent = this.createEvent("DelayedCallbackEvent");
            greenEvent.bind(() => {
                const greenMat = renderer.mainMaterial.clone();
                if (greenMat.mainPass.baseColor) greenMat.mainPass.baseColor = new vec4(0, 1, 0, 1);
                if (greenMat.mainPass["albedo"]) greenMat.mainPass["albedo"] = new vec4(0, 1, 0, 1);
                if (greenMat.mainPass["diffuseColor"]) greenMat.mainPass["diffuseColor"] = new vec4(0, 1, 0, 1);
                renderer.mainMaterial = greenMat;
                print("🟢 GREEN APPLIED TO MATERIAL");
            });
            greenEvent.reset(2.0);
            
            // BLUE after 4 seconds  
            const blueEvent = this.createEvent("DelayedCallbackEvent");
            blueEvent.bind(() => {
                const blueMat = renderer.mainMaterial.clone();
                if (blueMat.mainPass.baseColor) blueMat.mainPass.baseColor = new vec4(0, 0.5, 1, 1);
                if (blueMat.mainPass["albedo"]) blueMat.mainPass["albedo"] = new vec4(0, 0.5, 1, 1);
                if (blueMat.mainPass["diffuseColor"]) blueMat.mainPass["diffuseColor"] = new vec4(0, 0.5, 1, 1);
                renderer.mainMaterial = blueMat;
                print("🔵 BLUE APPLIED TO MATERIAL");
            });@component
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
            const mat = renderer.mainMaterial;
            
            // SUPER BRIGHT RED
            mat.mainPass.baseColor = new vec4(2.0, 0, 0, 1);
            if (mat.mainPass["color"]) mat.mainPass["color"] = new vec4(2.0, 0, 0, 1);
            transform.setLocalScale(this.originalScale.uniformScale(2.0));
            print("🔴 SUPER RED APPLIED");
            
            // SUPER BRIGHT GREEN after 2 seconds
            const greenEvent = this.createEvent("DelayedCallbackEvent");
            greenEvent.bind(() => {
                mat.mainPass.baseColor = new vec4(0, 2.0, 0, 1);
                if (mat.mainPass["color"]) mat.mainPass["color"] = new vec4(0, 2.0, 0, 1);
                print("🟢 SUPER GREEN APPLIED");
            });
            greenEvent.reset(2.0);
            
            // SUPER BRIGHT BLUE after 4 seconds  
            const blueEvent = this.createEvent("DelayedCallbackEvent");
            blueEvent.bind(() => {
                mat.mainPass.baseColor = new vec4(0, 0, 2.0, 1);
                if (mat.mainPass["color"]) mat.mainPass["color"] = new vec4(0, 0, 2.0, 1);
                print("🔵 SUPER BLUE APPLIED");
            });
            blueEvent.reset(4.0);
            
            // BLACK after 6 seconds
            const resetEvent = this.createEvent("DelayedCallbackEvent");
            resetEvent.bind(() => {
                mat.mainPass.baseColor = new vec4(0, 0, 0, 1);
                if (mat.mainPass["color"]) mat.mainPass["color"] = new vec4(0, 0, 0, 1);
                transform.setLocalScale(this.originalScale);
                this.animating = false;
                print("⚫ BLACK APPLIED");
            });
            resetEvent.reset(6.0);
        } else {
            print("❌ No material found!");
            this.animating = false;
        }
    }
}