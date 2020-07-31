<template>
  <!-- 个人中心 -->
  <div id="personal" class="container">
    <h1>个人中心</h1>
    <ul>
      <li>
        <span class="title">用户名</span>
        <span>123</span>
      </li>
      <li>
        <span class="title">昵称</span>
        <span>黄大侠</span>
      </li>
      <li>
        <span class="title">权限</span>
        <span>超级管理员</span>
      </li>
      <li>
        <span class="title">头像</span>
        <span
          ><img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594287414646&di=e6d8d7f0f220a8b059937e1350136b62&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201309%2F26%2F20130926095128_SiPMh.jpeg"
            alt=""
            width="60px"
        /></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#personal {
  li {
    padding: 20px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    .title {
      display: inline-block;
      width: 80px;
      color: #606266;
      text-align: left;
      margin-right: 30px;
    }
  }
}
</style>
