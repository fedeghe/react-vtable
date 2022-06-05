
/**
 * @jest-environment jsdom
 */
import React from "react";
import {
    render,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { configure } from "@testing-library/dom";

// import HyperTable from "../dist/index.js";
import HyperTable from "../source/HyperTable";
import config from "./configs/basic";

configure({
    testIdAttribute: "data-uie",
});

describe("HyperTable - basic", () => {
    it("should render as expected", () => {
        const { container, getByTestId } = render(
            <HyperTable config={config} />
        );
        // check all uie
        for(var i = 0; i < 15; i++)
            for(var j = 0; j < 3; j++)
                expect(getByTestId(`uie-${i}-${j}`))
        expect(container).toMatchSnapshot();
    });
});
