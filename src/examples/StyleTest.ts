import * as nocturnal from ".."

class StyleTest extends nocturnal.AppBuilder
{
    public async Build(name: string)
    {
        let app = new nocturnal.App();
        
        let html = new nocturnal.HTMLRootComponent("HTMLStyle.html")
        let head = new nocturnal.HTMLHeadComponent("HTMLStyle.html", new nocturnal.List<nocturnal.Attribute>());
        let body = new nocturnal.HTMLBodyComponent("HTMLStyle.html", new nocturnal.List<nocturnal.Attribute>());

        // HEAD

        let title = new nocturnal.HTMLTitleComponent("HTMLStyle.html", name);
        head.AddComponent(title);

        let style = new nocturnal.HTMLStyleComponent("HTMLStyle.html", "Style.css");
        head.AddComponent(style);

        // BODY

        let header = new nocturnal.TagComponent("HTMLStyle.html", "h1", new nocturnal.List<nocturnal.Attribute>(), "Hello, style!");
        body.AddComponent(header);

        html.AddComponent(head);
        html.AddComponent(body);

        app.AddComponent(html);

        await app.Build();
    }
}

let builder = new StyleTest();
builder.Build("Stylesheet");