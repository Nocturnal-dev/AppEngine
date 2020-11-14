import * as nocturnal from ".."

class HelloComponent extends nocturnal.Component
{
    public Build()
    {
        console.log("Hello, World!");
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