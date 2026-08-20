import { render } from "@testing-library/react";
import JsonLd from "../JsonLd";

function renderScript(data: object): HTMLScriptElement {
  const { container } = render(<JsonLd data={data} />);
  const script = container.querySelector('script[type="application/ld+json"]');
  if (!(script instanceof HTMLScriptElement)) {
    throw new Error("ld+json script not rendered");
  }
  return script;
}

describe("JsonLd", () => {
  it("renders the data as an inline ld+json script", () => {
    const data = { "@context": "https://schema.org", "@type": "WebSite", name: "GeoPingKak" };
    const script = renderScript(data);
    expect(JSON.parse(script.innerHTML)).toEqual(data);
  });

  it("accepts an array of schema objects", () => {
    const data = [{ "@type": "Article" }, { "@type": "BreadcrumbList" }];
    const script = renderScript(data);
    expect(JSON.parse(script.innerHTML)).toEqual(data);
  });

  it("escapes < so embedded </script> cannot close the tag early", () => {
    const data = { text: "</script><b>x</b>" };
    const script = renderScript(data);
    expect(script.innerHTML).not.toContain("</script>");
    expect(script.innerHTML).toContain("\\u003c/script>");
    expect(JSON.parse(script.innerHTML)).toEqual(data);
  });
});
