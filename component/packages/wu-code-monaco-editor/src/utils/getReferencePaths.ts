export function getReferencePaths(input: string) {
  const rx = /<reference path="([^"]+)"\s\/>/;
  return (input.match(new RegExp(rx.source, "g")) || []).map(s => {
    const match = s.match(rx);
    if (match && match.length >= 2) {
      return match[1];
    } else {
      throw new Error(`Error parsing: "${s}".`);
    }
  });
}
