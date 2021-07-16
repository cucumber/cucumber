import React, { useContext } from 'react'
import * as messages from '@cucumber/messages'

function mixinStyles<Classes>(
  builtIn: Record<string, string>,
  custom?: Record<string, string> | React.FunctionComponent
): Classes {
  const mixed: any = {}
  Object.keys(builtIn).forEach((key) => {
    if (builtIn[key]) {
      mixed[key] = builtIn[key]
    }
    if (custom && typeof custom !== 'function' && custom[key]) {
      mixed[key] = custom[key]
    }
  })
  return mixed as Classes
}

type Styles<C extends string> = Record<C,string>

export interface AnchorProps {
  id: string
}

export type AnchorClasses = Styles<'wrapper' | 'anchor'>

export interface AttachmentProps {
  attachment: messages.Attachment
}

export type AttachmentClasses = Styles<'text' | 'icon' | 'image'>

export interface ChildrenProps {}

export type ChildrenClasses = Styles<'children'>

export interface DataTableProps {
  dataTable: messages.DataTable
}

export type DataTableClasses = Styles<'table'>

export interface DescriptionProps {
  description?: string
}

export type DescriptionClasses = Styles<'content'>

export interface DocStringProps {
  docString: messages.DocString
}

export type DocStringClasses = Styles<'docString'>

export interface ErrorMessageProps {
  message: string
}

export type ErrorMessageClasses = Styles<'message'>

export interface ExamplesTableProps {
  tableHeader: messages.TableRow
  tableBody: readonly messages.TableRow[]
}

export type ExamplesTableClasses = Styles<'examplesTable' | 'detailRow'>

export interface FeatureProps {
  feature: messages.Feature
}

export type KeywordClasses = Styles<'keyword'>

export interface ParameterProps {
  parameterTypeName: string
}

export type ParameterClasses = Styles<'parameter'>

export interface StatusIconProps {
  status: messages.TestStepResultStatus
}

export type StatusIconClasses = Styles<'icon'>

export interface TagsProps {
  tags: readonly messages.Tag[]
}

export type TagsClasses = Styles<'tags' | 'tag'>

export declare type DefaultComponent<Props, Classes extends Styles<string> = {}> = React.FunctionComponent<
  Props & { styles: Classes }
>

export declare type CustomisedComponent<Props, Classes> = React.FunctionComponent<
  Props & {
    styles: Classes
    DefaultRenderer: React.FunctionComponent<Props>
  }
>

export declare type Customised<Props, Classes> =
  | CustomisedComponent<Props, Classes>
  | Partial<Classes>

export interface CustomRenderingSupport {
  Anchor?: Customised<AnchorProps, AnchorClasses>
  Attachment?: Customised<AttachmentProps, AttachmentClasses>
  Children?: Customised<ChildrenProps, ChildrenClasses>
  DataTable?: Customised<DataTableProps, DataTableClasses>
  Description?: Customised<DescriptionProps, DescriptionClasses>
  DocString?: Customised<DocStringProps, DocStringClasses>
  ErrorMessage?: Customised<ErrorMessageProps, ErrorMessageClasses>
  ExamplesTable?: Customised<ExamplesTableProps, ExamplesTableClasses>
  Feature?: Customised<FeatureProps, {}>
  Keyword?: Customised<any, KeywordClasses>
  Parameter?: Customised<ParameterProps, ParameterClasses>
  StatusIcon?: Customised<StatusIconProps, StatusIconClasses>
  Tags?: Customised<TagsProps, TagsClasses>
}

export declare type CustomRenderable = keyof CustomRenderingSupport

export const CustomRenderingContext = React.createContext<CustomRenderingSupport>({})

export function useCustomRendering<Props, Classes extends Styles<string> = {}>(
  component: CustomRenderable,
  defaultStyles: Record<string, string>,
  DefaultRenderer: DefaultComponent<Props, Classes>
): React.FunctionComponent<Props> {
  const { [component]: Custom } = useContext(CustomRenderingContext)
  const composedStyles = mixinStyles<Classes>(defaultStyles, Custom)
  const StyledDefaultRenderer: React.FunctionComponent<Props> = (props) => {
    return <DefaultRenderer {...props} styles={composedStyles} />
  }
  if (typeof Custom === 'function') {
    const StyledCustomRenderer: React.FunctionComponent<Props> = (props) => {
      return <Custom {...props} styles={composedStyles} DefaultRenderer={StyledDefaultRenderer} />
    }
    return StyledCustomRenderer
  }
  return StyledDefaultRenderer
}

export const CustomRendering: React.FunctionComponent<{
  support: CustomRenderingSupport
}> = (props) => {
  return (
    <CustomRenderingContext.Provider value={props.support}>
      {props.children}
    </CustomRenderingContext.Provider>
  )
}
