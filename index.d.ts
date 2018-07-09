declare module 'rieke' {
    import {ReactElement} from "react";
    import * as React from "react";

    export interface IRIETagProps {
        text: string;
        removeHandler?: Function;
        className?: string;
    }

    export interface IRIEBaseState {
        editing: boolean;
        loading: boolean;
        disabled: boolean;
        invalid: boolean;
    }

    export interface IRIEBaseProps {
        propName: string;
        change: Function;
        value: any;
        editProps?: any;
        defaultProps?: any;
        isDisabled?: boolean;
        validate?: Function;
        shouldBlockWhileLoading?: boolean,
        classLoading?: string;
        classEditing?: string;
        classDisabled?: string;
        classInvalid?: string;
        className?: string;
        options?: IRIESelectOption[];
        editing?: boolean;
        shouldStartEditOnDoubleClick?: boolean;
    }

    export interface IRIENumberProps extends IRIEBaseProps {
        format?: Function;
    }

    export interface IRIEToggleProps {
        textTrue: boolean;
        textFalse: boolean;
    }

    export interface IRIEToggleState {
        value: string;
        loading: boolean;
    }

    export interface IRIETagsProps {
        value: any;
        maxTags?: number;
        minTags?: number;
        separator?: string;
        elementClass?: string;
        blurDelay?: number;
        placeholder: string;
        wrapper?: string;
        wrapperClass?: string;
        wrapperEditing?: string;
    }

    export interface IRIETagsState {
        currentText: string;
        blurTimer: any;
    }

    export interface IRIETextAreaProps extends IRIEBaseProps {
        rows?: number;
        cols?: number;
    }

    export class RIEBase<P,S> extends React.Component<IRIEBaseProps, IRIEBaseState> {
        doValidations(value: number|string): any;
        selectInputText(element: any): void;
        elementClick(event): any;
        commit(value: string|number): void;
        makeClassString(): void
    }

    export class RIEStatefulBase<P,S> extends RIEBase<IRIEBaseProps, IRIEBaseState> {
        startEditing(): void;
        finishEditing(): void;
        cancelEditing(): void;
        keyDown(event: any): void;
        textChanged(event: any): void;
        renderEditingComponent(): ReactElement<any>;
        renderNormalComponent(): ReactElement<any>;
        elementBlur(event: any): void;
        elementClick(event: any): void;
    }

    export class RIEInput extends RIEStatefulBase<IRIEBaseProps, IRIEBaseState> {}

    export class RIESelect extends RIEStatefulBase<IRIEBaseProps, IRIEBaseState> {}

    export class RIENumber extends RIEStatefulBase<IRIENumberProps, IRIEBaseState> {
        validate(value: string|number): boolean;
    }

    export class RIETextArea extends RIEStatefulBase<IRIETextAreaProps, IRIEBaseState> {}

    export interface IRIESelectOption {
        id: number|string;
        text: number|string
    }

    export class RIEToggle extends RIEBase<IRIEToggleProps, IRIEToggleState> {}

    export class RIETag<P, S> extends React.Component<IRIETagProps, any>{
        remove(): void;
    }

    export class RIETags extends RIEStatefulBase<IRIETagsProps, IRIETagsState> {
        addTag(tag: any): void;
        removeTag(tag: any): void;
        cancelEditingDelayed(): void;
        cancelEditing(): void;
        makeTagElement(text: string): any
    }

}