import React, { Component, PropTypes } from 'react';
import TreeMenu, { TreeViewMenu, ListGroup, ListItem, Input } from 'react-simple-tree-menu'

const _Debuge = false;


// в виде массива
const treeData = [
    {
        key: 'first-level-node-1',
        label: 'Node 1 at the first level',
        //..., // любые другие реквизиты, которые вам нужны, например, url
        nodes: [
            {
                key: 'second-level-node-1',
                label: 'Node 1 at the second level',
                nodes: [
                    {
                        key: 'third-level-node-1',
                        label: 'Last node of the branch',
                        nodes: [] // вы можете удалить свойство nodes или оставить его как пустой массив
                    },
                ],
            },
        ],
    },
    {
        key: 'first-level-node-2',
        label: 'Node 2 at the first level',
    },
];
/* или как объект
const treeData = {
    'first-level-node-1': {               // ключ
        label: 'Node 1 at the first level',
        index: 0, // определите порядок рендеринга на том же уровне
        //...,      // любые другие реквизиты, которые вам нужны, например, url
        nodes: {
            'second-level-node-1': {
                label: 'Node 1 at the second level',
                index: 0,
                nodes: {
                    'third-level-node-1': {
                        label: 'Node 1 at the third level',
                        index: 0,
                        nodes: {} // вы можете удалить свойство nodes или оставить его как пустой массив
                    },
                },
            },
        },
    },
    'first-level-node-2': {
        label: 'Node 2 at the first level',
        index: 1,
    },
};
*/


export default class Main_Tree_1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th><h1>MainTree</h1></th>
                    </tr>
                    <tr>
                        <td width='220px'><TreeMenu data={treeData} /></td>
                        <td>Main</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}



/*
<TreeViewMenu
    data={treeData}
    onClickItem={({ key, label, ...props }) => {
        this.navigate(props.url); // пользовательские свойства
    }}
    debounceTime={125}>
    {({ search, items }) => (
        <>
            <Input onChange={e => search(e.target.value)} placeholder="Type and search" />
            <ListGroup>
                {items.map(props => (
                    // Возможно, Вам потребуется обернуть сторонний компонент, чтобы использовать реквизит
                    // проверить историю в качестве примера
                    // https://github.com/iannbing/react-simple-tree-menu/blob/master/stories/index.stories.js
                    <ListItem {...props} />
                ))}
            </ListGroup>
        </>
    )}
</TreeViewMenu>
*/
