import * as fs from "fs"
import * as child_process from "child_process"

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
    public async Build()
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

export class TagComponent extends Component
{
    private path: string;
    private tag : string;
    private attribs : List<Attribute>;
    private innerText : string;
    private childComponents : List<Component>;

    constructor(path : string, tag : string, attribs : List<Attribute>, innerText : string)
    {
        super();
        this.path = path;
        this.tag = tag;
        this.attribs = attribs;
        this.innerText = innerText;
        this.childComponents = new List<Component>();
    }

    public async Build()
    {
        let file = new HTMLFile(this.path);
        await file.WriteTagBegin(this.tag, this.attribs);
        await file.Write(this.innerText);
        for (let i = 0; i < this.childComponents.size(); i++) {
            await this.childComponents.get(i).Build();
        }
        await file.WriteTagEnd(this.tag);
    }
    public AddComponent(tag: Component)
    {
        this.childComponents.add(tag);
    }
    
}

export class HTMLScriptComponent extends TagComponent
{
    constructor(htmlpath : string, scriptText : string, scriptPath : string)
    {
        let list = new List<Attribute>();
        list.add(new Attribute("type", `"text/javascript"`));
        if(scriptPath)
        {
            list.add(new Attribute("src", scriptPath));
        }
        super(htmlpath, "script", list, scriptText);
    }
}

export class HTMLRootComponent extends TagComponent
{
    constructor(path : string)
    {
        super(path, "html", new List<Attribute>(), "");
    }
}

export class HTMLBodyComponent extends TagComponent
{
    constructor(path : string, attribs : List<Attribute>)
    {
        super(path, "body", attribs, "");
    }
}

export class HTMLHeadComponent extends TagComponent
{
    constructor(path : string, attribs : List<Attribute>)
    {
        super(path, "head", attribs, "");
    }
}

export class HTMLLinkComponent extends Component
{
    private path: string;
    private attribs : List<Attribute>;
    private innerText : string;

    constructor(path : string, attribs : List<Attribute>, innerText : string)
    {
        super();
        this.path = path;
        this.attribs = attribs;
        this.innerText = innerText;
    }

    public async Build()
    {
        let file = new HTMLFile(this.path);
        await file.WriteTagBegin("link", this.attribs);
    }
}

export class HTMLTitleComponent extends TagComponent
{
    constructor(path : string, title : string)
    {
        super(path, "title", new List<Attribute>(), title);
    }
}

export class HTMLStyleComponent extends HTMLLinkComponent
{
    constructor(path : string, stylesheetpath : string)
    {
        let attribs = new List<Attribute>();
        attribs.add(new Attribute("rel", "stylesheet"));
        attribs.add(new Attribute("href", stylesheetpath));
        super(path, attribs, "");
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
    public async Build()
    {
        for (let i = 0; i < this.components.size(); i++) {
            await this.components.get(i).Build();
        }
    }
}
export class AppBuilder
{
    public async Build(name: string)
    {
        
    }
}