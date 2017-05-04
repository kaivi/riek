declare module 'riek' {
    import {ReactElement} from "react";
    import * as React from "react";

    export interface RIETagProps {
        text: string;
        removeHandler?: Function;
        className?: string;
    }

    export interface RIEBaseState {
        editing: boolean;
        loading: boolean;
        disabled: boolean;
        invalid: boolean;
    }

    export interface RIEBaseProps {
        propName: string;
        change: Function;
        value: string|number;
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
    }

    export interface RIENumberProps extends RIEBaseProps {
        format?: Function;
    }

    export interface RIEToggleProps {
        textTrue: boolean;
        textFalse: boolean;
    }

    export interface RIEToggleState {
        value: string;
        loading: boolean;
    }

    export interface RIETagsProps {
        value: any;
        maxTags?: number;
        minTags?: number;
        separator?: string;
        elementClass?: string;
        blurDelay?: number;
        placeholder: string;
    }

    export interface RIETagsState {
        currentText: string;
        blurTimer: any;
    }

    export interface RIETextAreaProps extends RIEBaseProps {
        rows?: number;
        cols?: number;
    }

    export interface RIEBase<P,S> extends React.Component<RIEBaseProps, RIEBaseState> {
        constructor: (props: P|any) => any;
        doValidations: (value: number|string) => void;
        selectInputText: (element: any) => void;
        elementClick: (event) => any;
        commit: (value: string|number) => void;
        makeClassString: () => void
    }

    export interface RIEStatefulBase<P,S> extends RIEBase<RIEBaseProps, RIEBaseState> {
        constructor: (props: RIEBaseProps|any) => any;
        startEditing: () => void;
        finishEditing: () => void;
        cancelEditing: () => void;
        keyDown: (event: any) => void;
        textChanged: (event: any) => void;
        renderEditingComponent: () => ReactElement<any>;
        renderNormalComponent: () => ReactElement<any>;
        elementBlur: (event: any) => void;
        elementClick: (event: any) => void;
    }

    export interface RIEInput extends RIEStatefulBase<RIEBaseProps, RIEBaseState> {}
    export interface RIESelect extends RIEStatefulBase<RIESelectProps, RIEBaseState> {
        constructor: (props: RIESelectProps) => any;
    }

    export interface RIENumber extends RIEStatefulBase<RIENumberProps, RIEBaseState> {
        constructor: (props: RIENumberProps) => any;
        validate?: (value: string|number) => boolean;
    }

    export interface RIETextArea extends RIEStatefulBase<RIETextAreaProps, RIEBaseState> {
        constructor: (props: RIETextAreaProps) => any;
    }

    export interface RIESelectOption {
        id: number|string;
        text: number|string
    }

    export interface RIESelectProps extends RIEBaseProps {
        options?: RIESelectOption[]
    }

    export interface RIETag<P, S> extends React.Component<RIETagProps, any>{
        constructor: (props: P) => any;
        remove: () => void;
    }

    export interface RIEToggle<P, S> extends RIEBase<RIEToggleProps, RIEToggleState> {}

    export interface RIETags extends RIEStatefulBase<RIETagsProps, RIETagsState> {
        constructor: (props: RIETagsProps) => any;
        addTag: (tag: any) => void;
        removeTag: (tag: any) => void;
        cancelEditingDelayed: () => void;
        cancelEditing: () => void;
        makeTagElement: (text: string) => any
    }
}