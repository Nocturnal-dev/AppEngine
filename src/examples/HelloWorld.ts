import * as nocturnal from ".."

class HelloComponent extends nocturnal.Component
{
    public Build()
    {
        let file = new nocturnal.HTMLFile("HelloWorld.html");
        let attribs = new nocturnal.List<nocturnal.Attribute>();
        file.WriteTagBegin("html", attribs);
        file.WriteTagBegin("head", attribs);
        file.WriteTagEnd("head");
        file.WriteTagBegin("body", attribs);
        file.WriteTagBegin("p", attribs);
        file.Write("Hello, World!");
        file.WriteTagEnd("p");
        file.WriteTagEnd("body");
        file.WriteTagEnd("html");
    }
}
class Test extends nocturnal.AppBuilder
{
    public Build(name: string) : void
    {
        let app = new nocturnal.App();
        app.AddComponent(new HelloComponent());
        app.Build();
    }
}

let builder = new Test();
builder.Build("Test");