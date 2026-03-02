import { textFieldSchema } from "@/lib/zod/textfields";

describe("textFieldSchema", () => {
  it("should pass with valid content", () => {
    const result = textFieldSchema.safeParse({ content: "Hello world" });
    expect(result.success).toBe(true);
  });

  it("should fail with empty string", () => {
    const result = textFieldSchema.safeParse({ content: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("This field is required!");
    }
  });

  it("should fail with whitespace only", () => {
    const result = textFieldSchema.safeParse({ content: "   " });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("This field is required!");
    }
  });

  it("should trim whitespace and pass", () => {
    const result = textFieldSchema.safeParse({ content: "  Hello  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.content).toBe("Hello");
    }
  });

  it("should fail when content is missing", () => {
    const result = textFieldSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
