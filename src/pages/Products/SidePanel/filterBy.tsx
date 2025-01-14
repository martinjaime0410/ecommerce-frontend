import BookIcon from '@/utils/icons/book';
import { CaretDownOutlined } from '@ant-design/icons';
import { FormattedMessage, useModel } from '@umijs/max';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useMemo, useState } from 'react';

const FilterByPanel: React.FC = () => {
  const [selectedCategoryKeys, setSelectedCategoryKeys] = useState<React.Key[]>([]);
  const [selectedLabelKeys, setSelectedLabelKeys] = useState<React.Key[]>([]);
  const { categories } = useModel('category');
  const { labels } = useModel('label');
  const { getProductList } = useModel('product');

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        title: category.name,
        key: category.id,
        icon: <BookIcon style={{ width: 15 }} />,
      })),
    [categories],
  );

  const labelOptions = useMemo(
    () =>
      labels.map((label) => ({
        title: label.name,
        key: label.id,
        icon: <BookIcon style={{ width: 15 }} />,
      })),
    [labels],
  );

  const treeCategoryData: DataNode[] = useMemo(
    () => [
      {
        title: 'Categories',
        key: 'categories',
        children: categoryOptions,
      },
    ],
    [categoryOptions],
  );

  const treeLabelData: DataNode[] = useMemo(
    () => [
      {
        title: 'Labels',
        key: 'labels',
        children: labelOptions,
      },
    ],
    [labelOptions],
  );

  const onCategorySelect = (selectedKeysValue: React.Key[], event: any) => {
    let selectedKeys = [];
    if (event.nativeEvent.ctrlKey) {
      selectedKeys = selectedKeysValue;
    } else if (selectedCategoryKeys[0] !== event.node.key) {
      selectedKeys = [event.node.key];
    }

    setSelectedCategoryKeys(selectedKeys);
    setSelectedLabelKeys([]);

    getProductList({ categoryIds: selectedKeys.includes('categories') ? categories.map((item) => item.id) : selectedKeys });
  };

  const onLabelSelect = (selectedKeysValue: React.Key[], event: any) => {
    let selectedKeys = [];
    if (event.nativeEvent.ctrlKey) {
      selectedKeys = selectedKeysValue;
    } else if (selectedLabelKeys[0] !== event.node.key) {
      selectedKeys = [event.node.key];
    }

    setSelectedCategoryKeys([]);
    setSelectedLabelKeys(selectedKeys);

    getProductList({ labelIds: selectedKeys.includes('labels') ? labels.map((item) => item.id) : selectedKeys });
  };

  return (
    <>
      <h3>
        &nbsp;&nbsp;
        <i>
          <FormattedMessage id="pages.products.sidepanel.filterBy.description" />
        </i>
      </h3>
      <Tree
        showIcon
        defaultExpandAll
        switcherIcon={<CaretDownOutlined />}
        treeData={treeCategoryData}
        rootStyle={{ fontSize: 15 }}
        selectedKeys={selectedCategoryKeys}
        onSelect={onCategorySelect}
        multiple
      />

      <Tree
        showIcon
        defaultExpandAll
        switcherIcon={<CaretDownOutlined />}
        treeData={treeLabelData}
        rootStyle={{ fontSize: 15 }}
        selectedKeys={selectedLabelKeys}
        onSelect={onLabelSelect}
        multiple
      />
    </>
  );
};

export default FilterByPanel;
