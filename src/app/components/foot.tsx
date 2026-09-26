import { COPY } from "../copy";

/**
 * The hem of the cloth, and the only thing on it.
 *
 * The attribution is a kept brand commitment and is reproduced verbatim, set
 * in the maker's-mark voice and right-anchored to the value edge, so the cloth
 * is signed on the same edge every number in it ends on.
 *
 * The foot used to carry three equal-weight left-ragged paragraphs held apart
 * by ad-hoc inline margins, and the only chromatic text among them was a link
 * out to a site that has nothing to do with a soil reading — indigo and
 * underlined, so it outranked the air values while explaining none of them.
 * The author's site and the prose claim are both gone, by decision: the answer
 * is the cloth, and the hem carries a maker's mark and nothing else. The
 * Energy Monitor link and its label were removed earlier for the same reason.
 */
export function Foot() {
  return (
    <footer className="foot">
      <p className="sign">{COPY.attribution}</p>
    </footer>
  );
}
