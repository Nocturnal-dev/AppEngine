import * as fs from "./fs-extra"

export class Map<T> {
    private items: { [key: string]: T };

    constructor() {
        this.items = {};
    }

    add(key: string, value: T): void {
        this.items[key] = value;
    }

    has(key: string): boolean {
        return key in this.items;
    }

    get(key: string): T {
        return this.items[key];
    }
}
export class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }
}
export class Component
{
    public Build() : void
    {

    }
}
export class App
{
    private components : List<Component>;

    constructor()
    {
        this.components = new List<Component>();
    }
    public AddComponent(component : Component) : void
    {
        this.components.add(component);
    }
    public Build() : void
    {
        for (let i = 0; i < this.components.size(); i++) {
            this.components.get(i).Build();
        }
    }
}
export class AppBuilder
{
    public Build(name: string) : void
    {
        
    }
}