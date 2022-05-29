
/**
 * @jest-environment jsdom
 */
import React from "react";
import {
    render,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { configure } from "@testing-library/dom";

import HyperTable from "../source/HyperTable";
import config from "./configs/basic";

configure({
    testIdAttribute: "data-uie",
});

describe("HyperTable - basic", () => {
    it("should render as expected", () => {
        const { container } = render(
            <HyperTable config={config} />
        );
        expect(container).toMatchSnapshot();
    });
});
