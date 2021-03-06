import React from 'react';
import { Modal,  Input , Form, TreeSelect} from 'antd';

import { formatTree} from "../store";
import { connect } from 'react-redux';

import {galleryActions, collectionActions} from '../store/actions'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;


      formatTree(this.props.collections)
      const collections = Object.values(this.props.collections)

      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Choose collection" hasFeedback>
                {getFieldDecorator('id', {
                  rules: [{ required: true, message: 'Please select the collection to upload photos to!' }],
                })(
                  <TreeSelect
                      treeData={collections}
                      placeholder="Select Collection"
                      onChange={this.enableUpload}
                    />
                )}
            </Form.Item>
            <Form.Item label="Collection Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of collection!' }],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class AddCollection extends React.Component {
  handleCancel = () => {
    this.props.dispatch(galleryActions.hideAdd())
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();

      this.props.dispatch(collectionActions.create(values))
      this.props.dispatch(galleryActions.hideAdd())
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.addCollectionModalVisable}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          collections ={this.props.collections}
        />
    );
  }
}
const mapToProps = (state) =>{
  const addCollectionModalVisable = state.GalleryReducer.addCollectionModalVisable;
  const collections = state.CollectionsReducer.collections
  return {addCollectionModalVisable, collections};
}
export default connect(mapToProps)(AddCollection)
