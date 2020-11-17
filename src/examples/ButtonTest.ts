import * as nocturnal from ".."

class ButtonTest extends nocturnal.AppBuilder
{
    public async Build(name: string)
    {
        let app = new nocturnal.App();
        
        let title = new nocturnal.TagComponent("ButtonTest.html", "title", new nocturnal.List<nocturnal.Attribute>(), name);
        app.AddComponent(title);

        let script = new nocturnal.HTMLScriptComponent("ButtonTest.html", 
        `
        function test()
        {
            alert("Button clicked!");
        }
        `, "");
        app.AddComponent(script);
        
        let buttonattribs = new nocturnal.List<nocturnal.Attribute>();
        buttonattribs.add(new nocturnal.Attribute("onclick", `"test();"`));

        let button = new nocturnal.TagComponent("ButtonTest.html", "button", buttonattribs, "Click Me!");
        app.AddComponent(button);

        await app.Build();
    }
}

let builder = new ButtonTest();
builder.Build("ButtonTest");