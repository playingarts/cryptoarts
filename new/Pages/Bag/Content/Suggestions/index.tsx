import { FC, HTMLAttributes } from "react";
import { useNewBag } from "../../../../../hooks/newbag";
import CollectionItem from "../../../Shop/Collection/CollectionItem";
import { useBag } from "../../../../Contexts/bag";

const Suggestions: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { bag, updateQuantity, removeItem } = useNewBag();

  const products = undefined;
  //   const { products } = useProducts(
  //     bag
  //       ? {
  //           variables: {
  //             ids: Object.keys(bag),
  //           },
  //         }
  //       : {}
  //   );

  const { getPrice } = useBag();

  return (
    <div css={[{ display: "flex", gap: 30 }]} {...props}>
      {(products ?? [undefined, undefined]).map((product, index) =>
        product ? (
          <CollectionItem key={index + "Suggestion"} product={product} />
        ) : (
          <div
            key={"Suggestionsplace" + index}
            css={(theme) => [
              {
                borderRadius: 15,
                backgroundColor: theme.colors.white50,
                height: 515,
                width: 410,
              },
            ]}
          ></div>
        )
      )}
    </div>
  );
};

export default Suggestions;
