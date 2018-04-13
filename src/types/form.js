// @flow
import { type Node } from 'react';

export type ValidateCallback = (erros: any, values: any) => void;

export type ValidationRule = {
  /** validation error message */
  message?: string,
  /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
  type?: string,
  /** indicates whether field is required */
  required?: boolean,
  /** treat required fields that only contain whitespace as errors */
  whitespace?: boolean,
  /** validate the exact length of a field */
  len?: number,
  /** validate the min length of a field */
  min?: number,
  /** validate the max length of a field */
  max?: number,
  /** validate the value from a list of possible values */
  enum?: string | string[],
  /** validate from a regular expression */
  pattern?: RegExp,
  /** transform a value before validation */
  transform?: (value: any) => any,
  /** custom validate function (Note: callback must be called) */
  validator?: (
    rule: any,
    value: any,
    callback: any,
    source?: any,
    options?: any
  ) => any,
};

export type GetFieldDecoratorOptions = {
  valuePropName?: string,
  initialValue?: any,
  trigger?: string,
  getValueFromEvent?: (...args: any[]) => any,
  validateTrigger?: string | string[],
  rules?: ValidationRule[],
  exclusive?: boolean,
  normalize?: (value: any, prevValue: any, allValues: any) => any,
  validateFirst?: boolean,
};

/**
 * Represents a Form instance that is injected by Antds Form.create() HOC.
 */
export interface FormProp {
  getFieldsValue(fieldNames?: Array<string>): Object;
  getFieldValue(fieldName: string): any;
  setFieldsValue(obj: Object): void;
  setFields(obj: Object): void;
  validateFields(
    fieldNames: Array<string>,
    options: Object,
    callback: ValidateCallback
  ): any;
  validateFields(fieldNames: Array<string>, callback: ValidateCallback): any;
  validateFields(options: Object, callback: ValidateCallback): any;
  validateFields(callback: ValidateCallback): any;
  validateFieldsAndScroll(
    fieldNames?: Array<string>,
    options?: Object,
    callback?: ValidateCallback
  ): void;
  validateFieldsAndScroll(
    fieldNames?: Array<string>,
    callback?: ValidateCallback
  ): void;
  validateFieldsAndScroll(options?: Object, callback?: ValidateCallback): void;
  validateFieldsAndScroll(callback?: ValidateCallback): void;
  getFieldError(name: string): Object[];
  getFieldsError(names?: Array<string>): Object;
  isFieldValidating(name: string): boolean;
  isFieldTouched(name: string): boolean;
  isFieldsTouched(names?: Array<string>): boolean;
  resetFields(names?: Array<string>): void;
  getFieldDecorator(
    id: string,
    options?: GetFieldDecoratorOptions
  ): (node: Node) => Node;
}
