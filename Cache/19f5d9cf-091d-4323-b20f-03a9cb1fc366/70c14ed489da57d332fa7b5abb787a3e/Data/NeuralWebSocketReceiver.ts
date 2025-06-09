@component
export class NeuralWebSocketReceiver extends BaseScriptComponent {
    
    @input
    animatedObject: SceneObject;
    
    private originalScale: vec3;
    private animating: boolean = false;
    
    onAwake() {
        print("🔮 Neural Receiver starting...");
        
        if (!this.animatedObject) {
            print("❌ No animated object assigned - using self");
            this.animatedObject = this.getSceneObject();
        }
        
        if (this.animatedObject) {
            this.originalScale = this.animatedObject.getTransform().getLocalScale();
            print("✅ Target object found and ready!");
        }
        
        // Start test animation to show it works
        this.startTestMode();
    }
    
    startTestMode() {
        print("🧪 Starting test mode - animation every 5 seconds");
        const testEvent = this.createEvent("DelayedCallbackEvent");
        testEvent.bind(() => {
            this.executeNeuralAnimation();
            this.startTestMode();
        });
        testEvent.reset(5.0);
    }
    
    executeNeuralAnimation() {
        if (this.animating || !this.animatedObject) return;
        
        print("🧠⚡ NEURAL TRIGGER - EXECUTING LONG ANIMATION!");
        this.animating = true;
        
        try {
            const transform = this.animatedObject.getTransform();
            const renderComponent = this.animatedObject.getComponent("Component.RenderMeshVisual");
            
            if (renderComponent && renderComponent.mainMaterial) {
                const material = renderComponent.mainMaterial.clone();
                
                // Phase 1: Flash bright red and scale up (3 seconds)
                material.mainPass.baseColor = new vec4(1, 0, 0, 1); // BRIGHT RED
                renderComponent.mainMaterial = material;
                const bigScale = this.originalScale.uniformScale(4.0);
                transform.setLocalScale(bigScale);
                print("🔴 PHASE 1: BRIGHT RED + HUGE SCALE");
                
                // Phase 2: Flash blue (3 seconds)
                const phase2Event = this.createEvent("DelayedCallbackEvent");
                phase2Event.bind(() => {
                    if (renderComponent && renderComponent.mainMaterial) {
                        material.mainPass.baseColor = new vec4(0, 0.5, 1, 1); // BRIGHT BLUE
                        renderComponent.mainMaterial = material;
                        const mediumScale = this.originalScale.uniformScale(2.5);
                        transform.setLocalScale(mediumScale);
                        print("🔵 PHASE 2: BRIGHT BLUE + MEDIUM SCALE");
                    }
                });
                phase2Event.reset(3.0);
                
                // Phase 3: Flash green (3 seconds)
                const phase3Event = this.createEvent("DelayedCallbackEvent");
                phase3Event.bind(() => {
                    if (renderComponent && renderComponent.mainMaterial) {
                        material.mainPass.baseColor = new vec4(0, 1, 0, 1); // BRIGHT GREEN
                        renderComponent.mainMaterial = material;
                        const smallScale = this.originalScale.uniformScale(1.5);
                        transform.setLocalScale(smallScale);
                        print("🟢 PHASE 3: BRIGHT GREEN + SMALL SCALE");
                    }
                });
                phase3Event.reset(6.0);
                
                // Final: Back to normal (after 9 seconds total)
                const resetEvent = this.createEvent("DelayedCallbackEvent");
                resetEvent.bind(() => {
                    if (renderComponent && renderComponent.mainMaterial) {
                        material.mainPass.baseColor = new vec4(0.5, 0.5, 0.5, 1); // Gray
                        renderComponent.mainMaterial = material;
                        transform.setLocalScale(this.originalScale);
                        this.animating = false;
                        print("✅ 9-SECOND NEURAL ANIMATION COMPLETE!");
                    }
                });
                resetEvent.reset(9.0);
            }
        } catch (error) {
            print("❌ Animation error - resetting");
            this.animating = false;
        }
    }
}
    
    startTestMode() {
        // REMOVED - lens will just wait silently
        print("🔮 Lens staying open - waiting for neural triggers...");
    }
    
    executeNeuralAnimation() {
        if (this.animating || !this.animatedObject || this.isDestroyed) return;
        
        print("🧠⚡ NEURAL TRIGGER - EXECUTING LONG ANIMATION!");
        this.animating = true;
        
        try {
            const transform = this.animatedObject.getTransform();
            const renderComponent = this.animatedObject.getComponent("Component.RenderMeshVisual");
            
            if (renderComponent && renderComponent.mainMaterial) {
                const material = renderComponent.mainMaterial.clone();
                
                // Phase 1: Flash bright red and scale up (3 seconds)
                material.mainPass.baseColor = new vec4(1, 0, 0, 1); // BRIGHT RED
                renderComponent.mainMaterial = material;
                const bigScale = this.originalScale.uniformScale(4.0);
                transform.setLocalScale(bigScale);
                print("🔴 PHASE 1: BRIGHT RED + HUGE SCALE");
                
                // Phase 2: Flash blue (3 seconds)
                const phase2Event = this.createEvent("DelayedCallbackEvent");
                phase2Event.bind(() => {
                    if (!this.isDestroyed && renderComponent && renderComponent.mainMaterial) {
                        material.mainPass.baseColor = new vec4(0, 0.5, 1, 1); // BRIGHT BLUE
                        renderComponent.mainMaterial = material;
                        const mediumScale = this.originalScale.uniformScale(2.5);
                        transform.setLocalScale(mediumScale);
                        print("🔵 PHASE 2: BRIGHT BLUE + MEDIUM SCALE");
                    }
                });
                phase2Event.reset(3.0);
                
                // Phase 3: Flash green (3 seconds)
                const phase3Event = this.createEvent("DelayedCallbackEvent");
                phase3Event.bind(() => {
                    if (!this.isDestroyed && renderComponent && renderComponent.mainMaterial) {
                        material.mainPass.baseColor = new vec4(0, 1, 0, 1); // BRIGHT GREEN
                        renderComponent.mainMaterial = material;
                        const smallScale = this.originalScale.uniformScale(1.5);
                        transform.setLocalScale(smallScale);
                        print("🟢 PHASE 3: BRIGHT GREEN + SMALL SCALE");
                    }
                });
                phase3Event.reset(6.0);
                
                // Phase 4: Flash yellow (3 seconds)
                const phase4Event = this.createEvent("DelayedCallbackEvent");
                phase4Event.bind(() => {
                    if (!this.isDestroyed && renderComponent && renderComponent.mainMaterial) {
                        material.mainPass.baseColor = new vec4(1, 1, 0, 1); // BRIGHT YELLOW
                        renderComponent.mainMaterial = material;
                        const bigScale2 = this.originalScale.uniformScale(3.5);
                        transform.setLocalScale(bigScale2);
                        print("🟡 PHASE 4: BRIGHT YELLOW + BIG SCALE");
                    }
                });
                phase4Event.reset(9.0);
                
                // Phase 5: Flash purple (3 seconds)
                const phase5Event = this.createEvent("DelayedCallbackEvent");
                phase5Event.bind(() => {
                    if (!this.isDestroyed && renderComponent && renderComponent.mainMaterial) {
                        material.mainPass.baseColor = new vec4(1, 0, 1, 1); // BRIGHT PURPLE
                        renderComponent.mainMaterial = material;
                        const mediumScale2 = this.originalScale.uniformScale(2.0);
                        transform.setLocalScale(mediumScale2);
                        print("🟣 PHASE 5: BRIGHT PURPLE + MEDIUM SCALE");
                    }
                });
                phase5Event.reset(12.0);
                
                // Final: Back to normal (after 15 seconds total)
                const resetEvent = this.createEvent("DelayedCallbackEvent");
                resetEvent.bind(() => {
                    if (!this.isDestroyed && renderComponent && renderComponent.mainMaterial) {
                        material.mainPass.baseColor = new vec4(0.5, 0.5, 0.5, 1); // Gray
                        renderComponent.mainMaterial = material;
                        transform.setLocalScale(this.originalScale);
                        this.animating = false;
                        print("✅ 15-SECOND NEURAL ANIMATION COMPLETE!");
                    }
                });
                resetEvent.reset(15.0);
            }
        } catch (error) {
            print("❌ Animation error - resetting");
            this.animating = false;
        }
    }
    
    onDestroy() {
        this.isDestroyed = true;
        if (this.ws) {
            try {
                this.ws.close();
            } catch (error) {
                // Ignore cleanup errors
            }
        }
        print("🔮 Neural receiver destroyed safely");
    }
}