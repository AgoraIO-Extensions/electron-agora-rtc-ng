import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonProps,
  DividerProps,
  Divider,
  InputProps,
  Input,
  Slider,
  SliderSingleProps,
  SwitchProps,
  Switch,
  ImageProps,
  Image,
  Dropdown,
  DropdownProps,
  Menu,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const AgoraView = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return (
    <>
      <div {...props} />
    </>
  );
};

export const AgoraText = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return (
    <>
      <div {...props} />
    </>
  );
};

export const AgoraButton = (
  props: Omit<ButtonProps, 'onClick'> & {
    onPress?: React.MouseEventHandler<HTMLElement>;
  }
) => {
  return (
    <>
      <Button type={'primary'} {...props} onClick={props.onPress}>
        {props.title}
      </Button>
    </>
  );
};

export const AgoraDivider = (props: DividerProps) => {
  return (
    <>
      <Divider {...props} />
    </>
  );
};

export const AgoraTextInput = (
  props: InputProps & { onChangeText?: (text: string) => void }
) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const { style, ...others } = props;
  return (
    <>
      <Input
        style={style}
        {...others}
        onChange={({ target: { value: text } }) => {
          setValue(text);
          props.onChangeText?.call(this, text);
        }}
        value={value}
      />
    </>
  );
};

export const AgoraSlider = (
  props: Omit<SliderSingleProps, 'min' | 'max' | 'onAfterChange'> & {
    title?: string;
    minimumValue: number;
    maximumValue: number;
    onValueChange?: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
  }
) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const { title, ...others } = props;
  return (
    <>
      <AgoraText children={title} />
      <Slider
        {...others}
        min={props.minimumValue}
        max={props.maximumValue}
        value={value}
        onChange={(v) => {
          setValue(v);
          props.onValueChange?.call(this, v);
        }}
        onAfterChange={props.onSlidingComplete}
      />
    </>
  );
};

export const AgoraSwitch = (
  props: SwitchProps & {
    title?: string;
    onValueChange?: (value: boolean) => void;
  }
) => {
  const [checked, setChecked] = useState(props.checked);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const { title, ...others } = props;
  return (
    <>
      <AgoraText children={title} />
      <Switch
        {...others}
        checked={checked}
        onChange={(checked, event) => {
          setChecked(checked);
          props.onValueChange?.call(this, checked);
        }}
      />
    </>
  );
};

export const AgoraImage = (props: ImageProps) => {
  return (
    <>
      <Image {...props} />
    </>
  );
};

export interface AgoraDropdownItem {
  label: string;
  value: any;
}

export const AgoraDropdown = (
  props: Omit<DropdownProps, 'overlay'> & {
    title?: string;
    onValueChange?: (value: any, index: number) => void;
    items?: AgoraDropdownItem[];
    value?: any;
  }
) => {
  const [items, setItems] = useState(props.items);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setItems(props.items);
    setValue(props.value);
  }, [props.items, props.value]);

  return (
    <AgoraView>
      <AgoraText children={props.title} />
      <Dropdown
        {...props}
        overlay={
          <Menu
            selectable={true}
            items={items.map(({ label, value }) => ({
              label,
              key: value,
            }))}
            selectedKeys={[value.toString()]}
            defaultSelectedKeys={[value.toString()]}
            onSelect={(info) => {
              let key;
              if (typeof value === 'number') {
                key = +info.key;
              } else {
                key = info.key;
              }
              const index = items.findIndex(({ value }) => {
                return value === key;
              });
              setValue(key);
              props.onValueChange?.call(this, key, index);
            }}
          />
        }
      >
        <Button>
          {
            items.find((item) => {
              return value === item.value;
            }).label
          }
          <DownOutlined />
        </Button>
      </Dropdown>
    </AgoraView>
  );
};

export const AgoraStyle = {
  fullWidth: {
    width: '100%',
  },
  fullSize: {
    display: 'flex',
    flex: 1,
  },
  input: {
    height: 50,
    color: 'black',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoLarge: {
    flex: 1,
  },
  videoSmall: {
    width: 120,
    height: 120,
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
  },
  slider: {
    width: '100%',
    height: 40,
  },
};
