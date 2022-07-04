
/**
 * @jest-environment jsdom
 */
import React from "react";
import {
    render,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event"
import { configure } from "@testing-library/dom";

import VTable from "../dist/index.js";
// import VTable from "../source/VTable";
import config from "./configs/basic";

configure({
    testIdAttribute: "data-uie",
});

const Sorter =  ({sort}) => {
    const {sortAsc, sortDesc, unSort, direction, isSorting} = sort;
    return <div>
        <span title={direction === 'asc' ? "sorting": ""} data-uie="sortAsc" onClick={sortAsc}>▲</span>
        {direction && isSorting && <span  data-uie="unsort" onClick={unSort}>&times;</span>}
        <span title={direction === 'desc' ? "sorting" : ""} data-uie="sortDesc" onClick={sortDesc}>▼</span>
    </div>;
};

config.columns[0].header = ({
    column, columnIndex,
    sort, //: {sortAsc, sortDesc, unSort, direction} = {}
    isSorting
}) => <>
    <span>{column.key + '_' + columnIndex}</span>
    <Sorter {...{ column, columnIndex, sort, isSorting }} />
</>;
config.columns[0].sort = ({rowA, rowB, columnKey, direction}) => {
    const v = rowA[columnKey] > rowB[columnKey] ? 1 : -1;
    return {
        asc : v,
        desc: -v
    }[direction];
};
config.header = {height:80};

describe("VTable - basic sort", () => {
    it("should behave as expected", () => {
        const { container, getByTestId } = render(
            <VTable config={config} />
        );

        expect(container).toMatchSnapshot();
        const sortDesc = getByTestId(`sortDesc`);
        userEvent.click(sortDesc);
        expect(container).toMatchSnapshot();
    });
});
