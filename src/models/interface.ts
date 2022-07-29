/** 聊天消息 */
export interface Message {
    _id: string;
    type: string;
    content: string;
    from: {
        _id: string;
        username: string;
        avatar: string;
        originUsername: string;
        tag: string;
    };
    loading: boolean;
    percent: number;
    createTime: string;
    deleted?: boolean;
}

export interface MessagesMap {
    [messageId: string]: Message;
}

export interface GroupMember {
    user: {
        _id: string;
        username: string;
        avatar: string;
    };
    os: string;
    browser: string;
    environment: string;
}

/** 群组 */
export interface Group {
    _id: string;
    name: string;
    avatar: string;
    createTime: string;
    creator: string;
    onlineMembers: GroupMember[];
}

/** 好友 */
export interface Friend {
    _id: string;
    name: string;
    avatar: string;
    createTime: string;
}

/** 联系人 */
export interface Linkman extends Group, User {
    type: string;
    unread: number;
    messages: MessagesMap;
}

export interface LinkmansMap {
    [linkmanId: string]: Linkman;
}

/** 用户信息 */
export interface User {
    _id: string;
    username: string;
    avatar: string;
    isOnline: boolean;
}

/** redux store state */
export interface State {
    /** 用户信息 */
    user: {
        _id: string;
        username: string;
        avatar: string;
        tag: string;
        isAdmin: boolean;
    } | null;
    linkmans: LinkmansMap;
    /** 聚焦的联系人 */
    focus: string;
    /** 客户端连接状态 */
    connect: boolean;
    /** 客户端的一些状态值 */
    status: {
        ready: boolean;
        /** 是否显示登陆注册框 */
        loginRegisterDialogVisible: boolean;
        /** 主题 */
        theme: string;
        /** 主题主色调 */
        primaryColor: string;
        /** 主题文字主色调 */
        primaryTextColor: string;
        /** 背景图 */
        backgroundImage: string;
        /** 启用毛玻璃效果 */
        aero: boolean;
        /** 新消息声音提示开关 */
        soundSwitch: boolean;
        /** 声音类型 */
        sound: string;
        /** 新消息桌面提醒开关 */
        notificationSwitch: boolean;
        /** 新消息语言朗读开关 */
        voiceSwitch: boolean;
        /** 是否朗读个人发送的消息开关 */
        selfVoiceSwitch: boolean;
        /**
         * 用户标签颜色模式
         * singleColor: 固定颜色
         * fixedColor: 同一词始终同一颜色
         * randomColor: 同一词在每次渲染中保持同一颜色
         */
        tagColorMode: string;
        /** 是否展示侧边栏 */
        sidebarVisible: boolean;
        /** 是否展示搜索+联系人列表栏 */
        functionBarAndLinkmanListVisible: boolean;
        /** enable search expression when input some phrase */
        enableSearchExpression: boolean;
    };
}
