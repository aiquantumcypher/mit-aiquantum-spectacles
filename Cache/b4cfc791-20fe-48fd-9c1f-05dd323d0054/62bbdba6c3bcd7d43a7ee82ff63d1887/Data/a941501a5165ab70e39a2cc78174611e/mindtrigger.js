"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketReceiver = void 0;
var __selfType = requireType("./mindtrigger");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let WebSocketReceiver = class WebSocketReceiver extends BaseScriptComponent {
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
        }
        catch (error) {
            print("❌ Failed to create WebSocket: " + error);
        }
    }
    doAnimation() {
        if (!this.targetObject)
            return;
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
    __initialize() {
        super.__initialize();
        this.ws = null;
    }
};
exports.WebSocketReceiver = WebSocketReceiver;
exports.WebSocketReceiver = WebSocketReceiver = __decorate([
    component
], WebSocketReceiver);
//# sourceMappingURL=mindtrigger.js.map