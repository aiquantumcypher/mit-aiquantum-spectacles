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
        
        // Start test mode
        this.startTestMode();
    }
    
    startTestMode() {
        print("🧪 Test mode - animation every 3 seconds");
        const testEvent = this.createEvent("DelayedCallbackEvent");
        testEvent.bind(() => {
            this.fireAnimation();
            this.startTestMode();
        });
        testEvent.reset(3.0);
    }
    
    fireAnimation() {
        if (this.animating || !this.targetObject) return;
        
        print("🧠⚡ ANIMATION!");
        this.animating = true;
        
        const transform = this.targetObject.getTransform();
        
        // Just scale animation for now - colors later
        transform.setLocalScale(this.originalScale.uniformScale(3.0));
        print("📈 BIG");
        
        // Back to normal after 1 second
        const resetEvent = this.createEvent("DelayedCallbackEvent");
        resetEvent.bind(() => {
            transform.setLocalScale(this.originalScale);
            this.animating = false;
            print("📉 NORMAL");
        });
        resetEvent.reset(1.0);
    }
}