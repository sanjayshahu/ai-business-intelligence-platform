import React from "react";

export default function HtmlElementsDemo() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Headings */}
      <section>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </section>

      {/* Text */}
      <section>
        <p>This is a paragraph of text.</p>
        <span>Inline span</span>
        <strong>Strong text</strong>
        <em>Emphasized text</em>
        <mark>Highlighted text</mark>
        <small>Small text</small>
        <abbr title="Hypertext Markup Language">HTML</abbr>
      </section>

      {/* Links & Lists */}
      <section>
        <a href="https://example.com" target="_blank" rel="noreferrer">
          Example link
        </a>
        <ul>
          <li>Unordered item 1</li>
          <li>Unordered item 2</li>
        </ul>
        <ol>
          <li>Ordered item 1</li>
          <li>Ordered item 2</li>
        </ol>
        <dl>
          <dt>Term</dt>
          <dd>Definition</dd>
        </dl>
      </section>

      {/* Form elements */}
      <section>
        <form>
          <label>
            Text input:
            <input type="text" placeholder="Enter text" />
          </label>
          <br />

          <label>
            Email:
            <input type="email" placeholder="Enter email" />
          </label>
          <br />

          <label>
            Password:
            <input type="password" />
          </label>
          <br />

          <label>
            Number:
            <input type="number" min="0" max="10" />
          </label>
          <br />

          <label>
            Checkbox:
            <input type="checkbox" />
          </label>
          <br />

          <label>
            Radio 1
            <input type="radio" name="radioGroup" />
          </label>
          <label>
            Radio 2
            <input type="radio" name="radioGroup" />
          </label>
          <br />

          <label>
            Select:
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </label>
          <br />

          <label>
            Textarea:
            <textarea rows={3} />
          </label>
          <br />

          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </section>

      {/* Media */}
      <section>
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder"
          width="150"
          height="150"
        />
        <video width="240" controls>
          <source src="sample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <audio controls>
          <source src="sample.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </section>

      {/* Table */}
      <section>
        <table border={1}>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1 Col 1</td>
              <td>Row 1 Col 2</td>
            </tr>
            <tr>
              <td>Row 2 Col 1</td>
              <td>Row 2 Col 2</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Semantic HTML5 elements */}
      <section>
        <header>Header section</header>
        <nav>Navigation bar</nav>
        <main>Main content</main>
        <article>Article content</article>
        <aside>Sidebar</aside>
        <footer>Footer section</footer>
      </section>

      {/* Misc */}
      <section>
        <hr />
        <progress value={50} max={100}></progress>
        <meter value={0.7}>70%</meter>
        <details>
          <summary>More info</summary>
          Hidden details go here.
        </details>
        <time dateTime="2025-09-03">September 3, 2025</time>
        <code>console.log("Hello World");</code>
        <pre>{`
function greet() {
  return "Hello World";
}
        `}</pre>
      </section>
    </div>
  );
}
