import * as fs from "fs";
import { getSeasonPostContent } from "./src/getSeasonPostContent";

(async () => {
  const postContent = await getSeasonPostContent();
  fs.writeFileSync(
    `fixture.txt`,
    Buffer.from(`\ufeff${postContent}`, "utf16le")
  );
})();
