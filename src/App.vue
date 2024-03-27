<template>
   <div style="margin: 250px auto;">
    <vxe-table
      show-overflow
      show-header-overflow
      ref="vxetableRef"
      :data="initData"
      height="350px"
      class="table vxe-table"
      :row-config="{isHover: true, useKey: true}"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      :scroll-y="{enabled: true, gt: 4}"
      style="width: 100%"
      >
      <vxe-column
        v-for="item in headerKey"
        :field="item.prop"
        :title="item.name"
        :width="item.width"
        :key="item.prop"
        />
      <vxe-column
        v-for="item in columns"
        :field="item.prop"
        :title="item.name"
        :width="item.width"
        :key="item.prop"
        >
        <template #default="scope">
          <el-input
            class="vxe-table--ignore-clear"
            v-model="scope.row[item.prop]"
            @input="vxetableRef.updateStatus(scope)"
            :placeholder="item.placeholder || '请输入'"
            />
        </template>
      </vxe-column>
    </vxe-table>
   </div>
</template>

<script setup>
import { ref } from 'vue';
import { data } from './config'

const vxetableRef = ref()
const columns = ref([
  {
    name: '预览图',
    prop: 'pic',
  },
  {
    name: '商品编码',
    prop: 'partyCode',
    required: true,
    isSelect: true,
    customeHeader: true,
  },
  {
    name: '商品简称',
    prop: 'skuName',
    customeHeader: true,
  },
  {
    name: '库存',
    prop: 'stocks',
    placeholder: '默认不限',
    isNum: true,
  },
  {
    name: '采购价',
    prop: 'oriPrice',
    required: true,
    customeHeader: true,
    isNum: true,
  },
  {
    name: '零售价',
    prop: 'price',
    required: true,
    customeHeader: true,
    isNum: true,
  },
  {
    name: '重量（kg）',
    prop: 'weight',
    customeHeader: true,
    isNum: true,
  },
  {
    name: '分销控价',
    prop: 'retailAmt',
    isNum: true,
    customeHeader: true,
    width: 200,
  },
])

// 将form中的数据转换为表格数据
function combineSpecifications(specs) {
  // 过滤掉key为空或propValues为空数组的规格
  const filteredSpecs = specs.filter(spec => spec.key && spec.propValues.length > 0)
  if (filteredSpecs.length === 0) {
    return []
  }
  let combinations = [{}]
  filteredSpecs.forEach(spec => {
    // 如果当前规格的propValues为空，则直接跳过
    if (spec.propValues.length === 0) {
      return
    }
    let updatedCombinations = []
    combinations.forEach(combination => {
      spec.propValues.forEach(propValue => {
        let newCombination = { ...combination, [spec.key]: propValue.propValue }
        if ('pic' in propValue) {
          newCombination.pic = propValue.pic
        }
        updatedCombinations.push(newCombination)
      })
    })
    combinations = updatedCombinations
  })
  for (let i = 0; i < combinations.length; i++) {
    combinations[i].id = i
  }
  return combinations
}

const headerKey = ref([
  {
    prop: 'q',
    name: 'q',
    width: 80
  },
  {
    prop: '甜度',
    name: '甜度',
    width: 120
  },
])

const initData = ref(combineSpecifications(data))

</script>