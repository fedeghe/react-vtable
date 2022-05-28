import React, {useContext} from 'react';
import TableContext from '../../Context';
import useStyles from './style.js';
import {isFunction} from './../../utils';
const Caption = ({type}) => {
    const {
            state: {
                footer: {
                    caption: {
                        height: postFooterHeight,
                        component: FooterCaption
                    } = {}
                },
                header: {
                    caption: {
                        height: preHeaderHeight,
                        component: HeaderCaption
                    } = {}
                },
                // postFooterHeight,
                // FooterCaption,
                // preHeaderHeight,
                // HeaderCaption,

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
            header: {
                Component : HeaderCaption,
                cls: classes.HeaderCaption
            },
            footer: {
                Component : FooterCaption,
                cls:classes.FooterCaption
            }
        }[type];

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