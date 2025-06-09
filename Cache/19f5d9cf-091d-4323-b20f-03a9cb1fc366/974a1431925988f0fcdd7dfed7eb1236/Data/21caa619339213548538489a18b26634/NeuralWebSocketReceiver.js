"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralWebSocketReceiver = void 0;
var __selfType = requireType("./NeuralWebSocketReceiver");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let NeuralWebSocketReceiver = class NeuralWebSocketReceiver extends BaseScriptComponent {
    onAwake() {
        print("🔮 Neural WebSocket Receiver starting...");
        // Safety check
        if (!this.animatedObject) {
            print("❌ No animated object assigned - using self");
            this.animatedObject = this.getSceneObject();
        }
        if (this.animatedObject) {
            this.originalScale = this.animatedObject.getTransform().getLocalScale();
            print("✅ Target object found and ready!");
        }
        else {
            print("❌ Still no object - lens may crash");
            return;
        }
        // Small delay before connecting to prevent startup issues
        const startupDelay = this.createEvent("DelayedCallbackEvent");
        startupDelay.bind(() => {
            if (!this.isDestroyed) {
                this.connectToServer();
            }
        });
        startupDelay.reset(1.0);
    }
    connectToServer() {
        if (this.isDestroyed)
            return;
        try {
            const serverUrl = `ws://${this.serverIP}:${this.serverPort}`;
            print("🌐 Connecting to Unity server: " + serverUrl);
            // Use the CORRECT Spectacles WebSocket API
            this.ws = this.remoteServiceModule.createWebSocket(serverUrl);
            this.ws.onopen = (event) => {
                if (!this.isDestroyed) {
                    print("🚀 ✅ Connected to Unity WebSocket server!");
                    print("🧠 Ready to receive neural triggers!");
                }
            };
            this.ws.onmessage = (event) => {
                if (!this.isDestroyed && event && event.data) {
                    const message = event.data;
                    print("📥 Received from Unity: " + message);
                    if (message === "neural_event_triggered") {
                        this.executeNeuralAnimation();
                    }
                }
            };
            this.ws.onclose = (event) => {
                if (!this.isDestroyed) {
                    print("❌ WebSocket connection closed - staying open and waiting");
                    // Try to reconnect after 5 seconds
                    const reconnectEvent = this.createEvent("DelayedCallbackEvent");
                    reconnectEvent.bind(() => {
                        if (!this.isDestroyed) {
                            print("🔄 Attempting to reconnect...");
                            this.connectToServer();
                        }
                    });
                    reconnectEvent.reset(5.0);
                }
            };
            this.ws.onerror = (event) => {
                if (!this.isDestroyed) {
                    print("❌ WebSocket error - will retry connection");
                }
            };
        }
        catch (error) {
            print("❌ WebSocket setup failed: " + error);
            print("🔄 Will retry in 5 seconds...");
            // Retry connection
            const retryEvent = this.createEvent("DelayedCallbackEvent");
            retryEvent.bind(() => {
                if (!this.isDestroyed) {
                    this.connectToServer();
                }
            });
            retryEvent.reset(5.0);
        }
    }
    startTestMode() {
        // REMOVED - lens will just wait silently
        print("🔮 Lens staying open - waiting for neural triggers...");
    }
    executeNeuralAnimation() {
        if (this.animating || !this.animatedObject || this.isDestroyed)
            return;
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
        }
        catch (error) {
            print("❌ Animation error - resetting");
            this.animating = false;
        }
    }
    onDestroy() {
        this.isDestroyed = true;
        if (this.ws) {
            try {
                this.ws.close();
            }
            catch (error) {
                // Ignore cleanup errors
            }
        }
        print("🔮 Neural receiver destroyed safely");
    }
    __initialize() {
        super.__initialize();
        this.animating = false;
        this.ws = null;
        this.isDestroyed = false;
    }
};
exports.NeuralWebSocketReceiver = NeuralWebSocketReceiver;
exports.NeuralWebSocketReceiver = NeuralWebSocketReceiver = __decorate([
    component
], NeuralWebSocketReceiver);
//# sourceMappingURL=NeuralWebSocketReceiver.js.map