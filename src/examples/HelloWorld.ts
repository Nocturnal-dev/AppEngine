import * as nocturnal from ".."

class Test extends nocturnal.AppBuilder
{
    public async Build(name: string)
    {
        let app = new nocturnal.App();
        
        let title = new nocturnal.TagComponent("HelloWorld.html", "title", new nocturnal.List<nocturnal.Attribute>(), "Hello, World!");
        app.AddComponent(title);

        let text = new nocturnal.TagComponent("HelloWorld.html", "div", new nocturnal.List<nocturnal.Attribute>(), "");
        text.AddComponent(new nocturnal.TagComponent("HelloWorld.html", "p", new nocturnal.List<nocturnal.Attribute>(), "Hello, World!"));
        app.AddComponent(text);
        await app.Build();
    }
}

let builder = new Test();
builder.Build("Test");