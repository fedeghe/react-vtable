import React, {useContext} from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
import {isFunction} from './../../utils';
const Caption = ({position}) => {
    const {
            state: {
                postFooterHeight,
                PostFooter,
                preHeaderHeight,
                PreHeader,
                total,
                activeColumn, activeRow,
                activeColumnIndex, activeRowIndex,
                filtered,
                virtual:{
                    from, to, 
                    scrollTop
                }
            },
        } = useContext(TableContext),
        classes = useStyles({postFooterHeight, preHeaderHeight}),
        What = {
            pre: {
                Component : PreHeader,
                cls: classes.PreHeader
            },
            post: {
                Component : PostFooter,
                cls:classes.PostFooter
            }
        }[position];

    return (
        What.Component && <div className={What.cls}>{
            isFunction(What.Component)
            ? <What.Component {...{
                from, to, total,
                activeColumn, activeColumnIndex,
                activeRow, activeRowIndex,
                filtered,
                scrollTop
            }}/>
            : What.Component
        }</div>
    );
};
export default Caption;