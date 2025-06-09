"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralTrigger = void 0;
var __selfType = requireType("./mindtrigger");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let NeuralTrigger = class NeuralTrigger extends BaseScriptComponent {
    onAwake() {
        print("🔮 Neural Trigger starting...");
        if (!this.targetObject) {
            this.targetObject = this.getSceneObject();
        }
        if (this.targetObject) {
            this.originalScale = this.targetObject.getTransform().getLocalScale();
            print("✅ Ready!");
        }
        // Test animation every 4 seconds
        this.startTestMode();
    }
    startTestMode() {
        const testEvent = this.createEvent("DelayedCallbackEvent");
        testEvent.bind(() => {
            this.fireAnimation();
            this.startTestMode();
        });
        testEvent.reset(4.0);
    }
    fireAnimation() {
        if (this.animating || !this.targetObject)
            return;
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
    __initialize() {
        super.__initialize();
        this.animating = false;
    }
};
exports.NeuralTrigger = NeuralTrigger;
exports.NeuralTrigger = NeuralTrigger = __decorate([
    component
], NeuralTrigger);
//# sourceMappingURL=mindtrigger.js.map