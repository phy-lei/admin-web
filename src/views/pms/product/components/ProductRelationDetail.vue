<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productRelationForm" label-width="120px" class="form-inner-container" size="small">
      <el-form-item label="关联专题：">
        <el-transfer style="display: inline-block" filterable :filter-method="filterMethod" filter-placeholder="请输入专题名称"
          v-model="selectSubject" :titles="subjectTitles" :data="subjectList">
        </el-transfer>
      </el-form-item>
      <el-form-item label="关联优选：">
        <el-transfer style="display: inline-block" filterable :filter-method="filterMethod" filter-placeholder="请输入优选名称"
          v-model="selectPrefrenceArea" :titles="prefrenceAreaTitles" :data="prefrenceAreaList">
        </el-transfer>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品属性</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { fetchListAll as fetchSubjectList } from '@/api/subject'
import { fetchList as fetchPrefrenceAreaList } from '@/api/prefrenceArea'

const data = reactive({
  //所有专题列表
  subjectList: [],
  //专题左右标题
  subjectTitles: ['待选择', '已选择'],
  //所有专题列表
  prefrenceAreaList: [],
  //专题左右标题
  prefrenceAreaTitles: ['待选择', '已选择']
})


getSubjectList();
getPrefrenceAreaList();

function filterMethod(query, item) {
  return item.label.indexOf(query) > -1;
}
function getSubjectList() {
  fetchSubjectList().then(response => {
    let list = response.data;
    for (let i = 0; i < list.length; i++) {
      subjectList.push({
        label: list[i].title,
        key: list[i].id
      });
    }
  });
}
function getPrefrenceAreaList() {
  fetchPrefrenceAreaList().then(response => {
    let list = response.data;
    for (let i = 0; i < list.length; i++) {
      prefrenceAreaList.push({
        label: list[i].name,
        key: list[i].id
      });
    }
  });
}
function handlePrev() {
  $emit('prevStep')
}
function handleFinishCommit() {
  $emit('finishCommit', isEdit);
}


// export default {
//   name: "ProductRelationDetail",
//   props: {
//     value: Object,
//     isEdit: {
//       type: Boolean,
//       default: false
//     }
//   }

//   computed: {
//     //选中的专题
//     selectSubject: {
//       get: function () {
//         let subjects = [];
//         if (value.subjectProductRelationList == null || value.subjectProductRelationList.length <= 0) {
//           return subjects;
//         }
//         for (let i = 0; i < value.subjectProductRelationList.length; i++) {
//           subjects.push(value.subjectProductRelationList[i].subjectId);
//         }
//         return subjects;
//       },
//       set: function (newValue) {
//         value.subjectProductRelationList = [];
//         for (let i = 0; i < newValue.length; i++) {
//           value.subjectProductRelationList.push({ subjectId: newValue[i] });
//         }
//       }
//     },
//     //选中的优选
//     selectPrefrenceArea: {
//       get: function () {
//         let prefrenceAreas = [];
//         if (value.prefrenceAreaProductRelationList == null || value.prefrenceAreaProductRelationList.length <= 0) {
//           return prefrenceAreas;
//         }
//         for (let i = 0; i < value.prefrenceAreaProductRelationList.length; i++) {
//           prefrenceAreas.push(value.prefrenceAreaProductRelationList[i].prefrenceAreaId);
//         }
//         return prefrenceAreas;
//       },
//       set: function (newValue) {
//         value.prefrenceAreaProductRelationList = [];
//         for (let i = 0; i < newValue.length; i++) {
//           value.prefrenceAreaProductRelationList.push({ prefrenceAreaId: newValue[i] });
//         }
//       }
//     }
//   }

// }
</script>

<style scoped></style>
