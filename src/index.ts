import * as fs from "fs"

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

// HTML

export class Attribute
{
    private name: string;
    private value: string;

    public constructor(name : string, value : string)
    {
        this.name = name;
        this.value = value;
    }
    public SetName(name : string) : void
    {
        this.name = name;
    }
    public GetName() : string
    {
        return this.name;
    }

    public SetValue(value : string) : void
    {
        this.value = value;
    }
    public GetValue() : string
    {
        return this.value;
    }
}
export class HTMLFile
{
    private path : string;
    constructor(path : string)
    {
        this.path = path;
    }

    public async Write(data : string)
    {
        await fs.appendFile(this.path, data, function(err)
        {
            if (err) console.error(err);
        });
    }

    public async WriteTagBegin(tag : string, attribs : List<Attribute>)
    {
        let result = "";
        result += `<${tag} `;
        
        let i;
        for (i = 0; i < attribs.size(); i++)
        {
            result += `${attribs.get(i).GetName()}=${attribs.get(i).GetValue()} `;
        }
        result += ">";
        await this.Write(result);
    }
    
    public async WriteTagEnd(tag : string)
    {
        await this.Write(`</${tag}>`);
    } 
};

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