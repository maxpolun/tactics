// scenes are distinct screens
// you might have a TitleScene, a BattleScene, etc
// the lifecyle is:
// 1. construct scene
// 2. load scene (call load method, wait for promise to resolve. Possibly show loading screen)
//    load is async so you can load assets, do lazy code loading, etc
// 3. start scene: this is where all the actual logic lives
// 4. pause: pause the scene externally (when the window is not in view, etc)
// 5. onChange: when the scene decides that it's done and should transition to another scene,
//    it passes a scene name back to the top level and the next scene starts

// note that scenes don't have to use webgl
export default interface IScene {
  load (): Promise<any>
  start (): void
  pause (): void
  onChange (callback: (newScene: string, args: any) => void): void
}
