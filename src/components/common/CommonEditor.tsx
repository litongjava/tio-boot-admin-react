import '@wangeditor/editor/dist/css/style.css'
import React, {useEffect, useState} from 'react'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'
import {customUploadForEditor} from "@/services/system/systemService";
import { i18nChangeLanguage } from '@wangeditor/editor'

// 切换语言 - 'en' 或者 'zh-CN'
i18nChangeLanguage('en')

type CommonEditorProps = {
  value?: string;
  onChange: (editor: IDomEditor) => void;
}
const CommonEditor: React.FC<CommonEditorProps> = ({value, onChange}) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {}
  }

  // @ts-ignore
  editorConfig.MENU_CONF['uploadImage'] = {
    // 自定图片义上传
    customUpload: customUploadForEditor,
    // 小于该值就插入 base64 格式（而不上传），默认为 0
    base64LimitSize: 5 * 1024 // 5kb
  }

  // @ts-ignore
  editorConfig.MENU_CONF['uploadVideo'] = {
    // 自定义上传
    customUpload: customUploadForEditor,
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{border: '1px solid #ccc', zIndex: 100}}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{borderBottom: '1px solid #ccc'}}
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={setEditor}
          onChange={onChange}
          mode="default"
          style={{height: '600px', overflowY: 'hidden'}}
        />
      </div>
    </>
  )
}

export default CommonEditor
