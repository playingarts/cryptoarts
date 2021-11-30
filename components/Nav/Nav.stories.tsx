import { ComponentStory, ComponentMeta } from "@storybook/react";
import Nav from ".";
import { DecksQuery } from "../../hooks/deck";

export default {
  title: "Header/Nav",
  component: Nav,
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;

export const Primary = Template.bind({});
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: DecksQuery,
        },
        result: {
          data: {
            decks: [
              {
                _id: "_id",
                title: "",
                slug: "1 deck",
              },
              {
                _id: "_id",
                title: "",
                slug: "deck 2",
              },
            ],
          },
        },
      },
    ],
  },
};
