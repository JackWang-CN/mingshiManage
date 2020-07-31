<!-- 公告 -->
<template>
  <div id="notice" class="shadow_container">
    <div class="pageTitle">公告</div>
    <ul>
      <li v-for="item in noticeList" :key="item.id">
        <div class="content">{{item.content}}</div>
        <div class="info">
          <span>{{item.username}}</span>发表于
          <span>{{item.date}}</span>
          <span>{{item.read}}人已读</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [
        {
          id: 0,
          username: "疾风剑豪",
          date: "2020-06-08 15:11",
          read: "10",
          content: "想杀我？你可以试试。面对疾风吧，哈撒给！"
        },
        {
          id: 1,
          username: "疾风剑豪",
          date: "2020-06-08 15:11",
          read: "10",
          content: "想杀我？你可以试试。面对疾风吧，哈撒给！"
        },
        {
          id: 2,
          username: "疾风剑豪",
          date: "2020-06-08 15:11",
          read: "10",
          content: "想杀我？你可以试试。面对疾风吧，哈撒给！"
        },
        {
          id: 3,
          username: "疾风剑豪",
          date: "2020-06-08 15:11",
          read: "10",
          content: "想杀我？你可以试试。面对疾风吧，哈撒给！"
        },
        {
          id: 4,
          username: "疾风剑豪",
          date: "2020-06-08 15:11",
          read: "10",
          content: "想杀我？你可以试试。面对疾风吧，哈撒给！"
        },
        {
          id: 5,
          username: "疾风剑豪",
          date: "2020-06-08 15:11",
          read: "10",
          content: "想杀我？你可以试试。面对疾风吧，哈撒给！"
        },
        {
          id: 6,
          username: "疾风剑豪",
          date: "2020-06-08 15:11",
          read: "10",
          content: "想杀我？你可以试试。面对疾风吧，哈撒给！"
        },
        {
          id: 7,
          username: "疾风剑豪",
          date: "2020-06-08 15:11",
          read: "10",
          content: "想杀我？你可以试试。面对疾风吧，哈撒给！"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
#notice {
  li {
    .content {
      color: #797878;
      margin: 30px 10px;
      font-size: 17px;
    }
    .info {
      color: #8f8f8f;
      width: 95%;
      text-align: right;
      font-size: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eaeefb;
      span {
        margin: 0 8px;
      }
    }
  }
}
</style>