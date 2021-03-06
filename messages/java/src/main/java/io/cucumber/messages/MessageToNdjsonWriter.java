package io.cucumber.messages;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

public final class MessageToNdjsonWriter implements MessageWriter {
    private final Writer out;

    public MessageToNdjsonWriter(OutputStream out) {
        this.out = new OutputStreamWriter(out, StandardCharsets.UTF_8);
    }

    @Override
    public void write(Object message) throws IOException {
        JSON.writeValue(out, message);
        out.write("\n");
        out.flush();
    }
}
