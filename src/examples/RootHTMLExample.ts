import * as nocturnal from ".."

class RootHTMLExample extends nocturnal.AppBuilder
{
    public async Build(name: string)
    {
        let app = new nocturnal.App();
        
        let html = new nocturnal.HTMLRootComponent("HTMLExample.html")
        let head = new nocturnal.HTMLHeadComponent("HTMLExample.html", new nocturnal.List<nocturnal.Attribute>());
        let body = new nocturnal.HTMLBodyComponent("HTMLExample.html", new nocturnal.List<nocturnal.Attribute>());

        let title = new nocturnal.HTMLTitleComponent("HTMLExample.html", name);
        head.AddComponent(title);

        html.AddComponent(head);
        html.AddComponent(body);

        app.AddComponent(html);

        await app.Build();
    }
}

let builder = new RootHTMLExample();
builder.Build("Example");