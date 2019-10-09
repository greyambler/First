export function get_JsonTree() {
  let DATATREE = {
    module: 'react-ui-tree1',
    children: [
      {
        module: 'dist',
        collapsed: true,
        children: [
          {
            module: 'node.js',
            leaf: true
          },
          {
            module: 'react-ui-tree.css',
            leaf: true
          },
          {
            module: 'react-ui-tree.js',
            leaf: true
          },
          {
            module: 'tree.js',
            leaf: true
          }
        ]
      },
      {
        module: 'example',
        children: [
          {
            module: 'app.js',
            leaf: true
          },
          {
            module: 'app.less',
            leaf: true
          },
          {
            module: 'index.html',
            leaf: true
          }
        ]
      },
      {
        module: 'lib',
        children: [
          {
            module: 'node.js',
            leaf: true
          },
          {
            module: 'react-ui-tree.js',
            leaf: true
          },
          {
            module: 'react-ui-tree.less',
            leaf: true
          },
          {
            module: 'tree.js',
            leaf: true
          }
        ]
      },
      {
        module: '.gitiignore',
        leaf: true
      },
      {
        module: 'index.js',
        leaf: true
      },
      {
        module: 'LICENSE',
        leaf: true
      },
      {
        module: 'Makefile',
        leaf: true
      },
      {
        module: 'package.json',
        leaf: true
      },
      {
        module: 'README.md',
        leaf: true
      },
      {
        module: 'webpack.config.js',
        leaf: true
      }
    ]
  };


  return DATATREE;
}

class d_Tree {
  constructor(_module, _children) {
    this.module = _module;
    this.children = _children;
  }
}

class d_TreeItem {
  constructor(_module, _children) {
    this.collapsed = false;
    this.module = _module;
    this.children = _children;
  }
}
class d_TreeChild {
  constructor(_module, _id, _type, _children) {
    this.module = _module;
    this.id = _id;
    this.type = _type;
    this.leaf = false;
    this.children = _children;
  }
}
export function get_Child(list, _type) {
  let children = Array();
  let t = 0;
  for (const item of list) {
    children[t] = new d_TreeChild(item.nm, item.id, _type);
    t++;
  }
  return children;
}
export function get_Child_dvc(list) {
  let children = Array();
  let t = 0;
  for (const item of list) {
    children[t] = new d_TreeChild(item.nm, item.id, item.typ);
    t++;
  }
  return children;
}

export function get_Lists(_Json) {
  /*
  //из класса в Json
    var myJSON = { "name": "Chris", "age": "38" };
    var myString = JSON.stringify(myJSON);

  //из Json в класс
    let myJSON1 = JSON.parse(myString);
  */

  let J_Rss = JSON.parse(_Json);

  let Fuels = new d_TreeItem('Топливо', get_Child(J_Rss.fuel, "fuel"));
  let TpList = new d_TreeItem('Оборудование', get_Child(J_Rss.tpList, "tpList"));

  let ObLists = new d_TreeItem('АЗС', get_Child(J_Rss.obList, "obList"));


  if (ObLists != null && ObLists.children != null) {
    for (const item of ObLists.children) {
      if ('f09de2cd-56e9-4f0e-a822-232e9a7c4d0c' == item.id) {
        let J_Rss_ID = JSON.parse(get_Rss_ID(item.id));

        item.children = new d_TreeItem('dvc', get_Child_dvc(J_Rss_ID.dvc));
      }

    }
  }

  let J_Rss_ID = JSON.parse(get_Rss_ID());

  let dvcs = new d_TreeItem('dvc', get_Child_dvc(J_Rss_ID.dvc));

  let D_Tree = new d_Tree('Справочники', [Fuels, ObLists, TpList, dvcs]);

  let Str_D_Tree = JSON.stringify(D_Tree);

  return D_Tree;
}


/*
Data Attributes
{
    id: '[optional] string',
    name: 'string',
    children: '[optional] array',
    toggled: '[optional] boolean',
    active: '[optional] boolean',
    loading: '[optional] boolean',
    decorators: '[optional] object',
    animations: '[optional] object'
},

*/


class d_TreeTreeBar {
  constructor(_module, _children, _type, _toggled) {
    this.name = _module;
    if (_toggled == null) {
      _toggled = false;
    }
    this.toggled = _toggled;
    this.children = _children;
  }
}
class d_ChildTreeBar {
  constructor(_name, _id, _fu, _type) {
    this.id = _id;
    this.name = _name;
    this.fu = _fu;
    this.type = _type;
    this.children = get_ListsChildTreeBar(_id);
  }
}
export function get_ListsChildTreeBar(_ID) {
  let children = null;
  if ('f09de2cd-56e9-4f0e-a822-232e9a7c4d0c' == _ID) {
    let J_Rss_ID = JSON.parse(get_Rss_ID(_ID));
    children = get_ListChildTreeBar(J_Rss_ID.dvc, 'dvc');
  }
  return children;
}
export function get_ListChildTreeBar(list, _type) {
  let children = Array();
  let t = 0;
  for (const item of list) {
    children[t] = new d_ChildTreeBar(item.nm, item.id, item.fu, _type);
    t++;
  }
  return children;
}
export function get_Full_TreeBar(_Json) {
  let J_Rss = JSON.parse(_Json);
  let Fuels = new d_TreeTreeBar('Топливо', get_ListChildTreeBar(J_Rss.fuel, 'fuel'), 'fuel', false);
  let TpList = new d_TreeTreeBar('Оборудование', get_ListChildTreeBar(J_Rss.tpList, 'tpList'), 'tpList', false);
  let ObLists = new d_TreeTreeBar('Магазины', get_ListChildTreeBar(J_Rss.obList, 'obList'), 'obList', false);
  
  let D_Tree = new d_TreeTreeBar('Справочники', [Fuels, ObLists, TpList], 'root', true);

  //let Str_D_Tree = JSON.stringify(D_Tree);
  return D_Tree;
}
export function get_Rss() {
  return '{"tpList":[' +
    '{"id":"2","nm":"резервуар"},' +
    '{"id":"3","nm":"ТРК"},' +
    '{"id":"5","nm":"ИБП"},' +
    '{"id":"6","nm":"терминал самообслуживания"}' +
    '],' +
    '"obList":[' +
    '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","nm":"АЗС 81 Ярославское шоссе 15"},' +
    '{"id":"99fa476d-e6b9-4eae-8906-8f7f0100c899","nm":"АЗС-2"}' +
    '],' +
    '"fuel":[' +
    '{"id":1,"nm":"Аи-95","fu":"95"},' +
    '{"id":2,"nm":"Аи-92","fu":"92"},' +
    '{"id":3,"nm":"ДТ","fu":"ДТ"},' +
    '{"id":4,"nm":"Аи-95-фрост","fu":"95ф"},' +
    '{"id":5,"nm":"Аи-98","fu":"98"}' +
    ']}';
}

export function get_Rss_ID() {
  return '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","dvc":[' +
    '{"id":"fe17dea5-c1e9-4a41-b343-f77a7d039824","typ":"pl","nm":"Резервуар А на АЗС1","fuel":1,"prop":[' +
    '{"typ":"plvolume","capacity":3000}' +
    ']},' +
    '{"id":"c7c00a08-4bb3-4038-8173-921dfb58c689","typ":"pl","nm":"Резервуар Б на АЗС1","fuel":2,"prop":[' +
    '{"typ":"plvolume","capacity":2000}]},' +
    '{"id":"3216db78-d495-4e6c-8155-23b5a3bf70c7","typ":"pump","nm":"ТРК А на АЗС1","prop":[]},' +
    '{"id":"436b24f0-a6be-49f2-b8b5-07bc5de0e244","typ":"pump","nm":"ТРК Б на АЗС1","prop":[]},' +
    '{"id":"d0c35750-d15b-4922-bd45-6617400c2a9e","typ":"tso","nm":"ТСО на АЗС1","prop":[]}' +
    ']}';
}





export function get_DateRSS() {

  let debugeList = get_Rss_DevList();
  let ListDev = JSON.parse(debugeList);
  //let J_ListDev = get_ListFals(ListDev);
  return ListDev;
}

export function get_Rss_DevList() {

  return '{' +
      '"tpList":[' +
      '{"id":"2","nm":"резервуар"},' +
      '{"id":"3","nm":"ТРК"},' +
      '{"id":"5","nm":"ИБП"},' +
      '{"id":"6","nm":"терминал самообслуживания"}' +
      '],' +
      '"obList":[' +
      '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c","nm":"АЗС 81 Ярославское шоссе 15"},' +
      '{"id":"99fa476d-e6b9-4eae-8906-8f7f0100c899","nm":"АЗС-2"}' +
      '],' +
      '"fuel":[' +
      '{"id":1,"nm":"Аи-95","fu":"95"},' +
      '{"id":2,"nm":"Аи-92","fu":"92"},' +
      '{"id":3,"nm":"ДТ","fu":"ДТ"},' +
      '{"id":4,"nm":"Аи-95-фрост","fu":"95ф"},' +
      '{"id":5,"nm":"Аи-98","fu":"98"}' +
      ']' +
      '}';
}