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

export class HTMLScriptFileComponent extends HTMLScriptComponent
{
    constructor(htmlpath : string, scriptPath : string)
    {
        super(htmlpath, "", scriptPath);
    }
}

export class HTMLHeaderComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "h1", attribs, text);
        }
        else
        {
            super(htmlpath, "h1", new List<Attribute>(), text);
        }
    }
}

export class HTMLHeader2Component extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "h2", attribs, text);
        }
        else
        {
            super(htmlpath, "h2", new List<Attribute>(), text);
        }
    }
}

export class HTMLHeader3Component extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "h3", attribs, text);
        }
        else
        {
            super(htmlpath, "h3", new List<Attribute>(), text);
        }
    }
}

export class HTMLHeader4Component extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "h4", attribs, text);
        }
        else
        {
            super(htmlpath, "h4", new List<Attribute>(), text);
        }
    }
}

export class HTMLHeader5Component extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "h5", attribs, text);
        }
        else
        {
            super(htmlpath, "h5", new List<Attribute>(), text);
        }
    }
}

export class HTMLHeader6Component extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "h6", attribs, text);
        }
        else
        {
            super(htmlpath, "h6", new List<Attribute>(), text);
        }
    }
}

export class HTMLParagraphComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "p", attribs, text);
        }
        else
        {
            super(htmlpath, "p", new List<Attribute>(), text);
        }
    }
}

export class HTMLSpanComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "span", attribs, text);
        }
        else
        {
            super(htmlpath, "span", new List<Attribute>(), text);
        }
    }
}

export class HTMLBoldComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "b", attribs, text);
        }
        else
        {
            super(htmlpath, "b", new List<Attribute>(), text);
        }
    }
}

export class HTMLStrongComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "strong", attribs, text);
        }
        else
        {
            super(htmlpath, "strong", new List<Attribute>(), text);
        }
    }
}

export class HTMLItallicComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "i", attribs, text);
        }
        else
        {
            super(htmlpath, "i", new List<Attribute>(), text);
        }
    }
}

export class HTMLEmphasizedComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "em", attribs, text);
        }
        else
        {
            super(htmlpath, "em", new List<Attribute>(), text);
        }
    }
}

export class HTMLMarkComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "mark", attribs, text);
        }
        else
        {
            super(htmlpath, "mark", new List<Attribute>(), text);
        }
    }
}

export class HTMLSmallComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "small", attribs, text);
        }
        else
        {
            super(htmlpath, "small", new List<Attribute>(), text);
        }
    }
}

export class HTMLDeletedComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "del", attribs, text);
        }
        else
        {
            super(htmlpath, "del", new List<Attribute>(), text);
        }
    }
}

export class HTMLInsertComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "ins", attribs, text);
        }
        else
        {
            super(htmlpath, "ins", new List<Attribute>(), text);
        }
    }
}

export class HTMLSubscriptComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "sub", attribs, text);
        }
        else
        {
            super(htmlpath, "sub", new List<Attribute>(), text);
        }
    }
}

export class HTMLSuperScriptComponent extends TagComponent
{
    constructor(htmlpath : string, text : string, attribs? : List<Attribute>)
    {
        if(attribs)
        {
            super(htmlpath, "sup", attribs, text);
        }
        else
        {
            super(htmlpath, "sup", new List<Attribute>(), text);
        }
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