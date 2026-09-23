import React from "react";
import { Link } from "react-router-dom";  // ✅ Correct import

type HtmlChildProps = {
  val: {
    n: string;
    c: string;
    u: string;
    url:string;
  };
};

const HtmlChild: React.FC<HtmlChildProps> = ({ val }) => {
  const { n, c, u ,url} = val; // ✅ Removed 'url' since it's not in type

  return (
    <div>
      <h3>HtmlChild Component</h3>
      <Link to={url}>Contact</Link>  {/* ✅ Link works now */}
      <pre>
        {n} {c} {u}
      </pre>
    </div>
  );
};

export default HtmlChild;
