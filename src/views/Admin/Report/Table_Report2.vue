<template>
  <div class="container mx-auto px-4">
    <div class="py-4 flex justify-end">
      <button
        class="btn btn-primary w-24 bg-green-500 text-white border border-green-500 hover:bg-green-700"
      >
        Export PDF
      </button>
    </div>
    <h2 class="text-2xl font-bold mb-4 text-center">
      บัญชีสำหรับผู้ทำการค้าของเก่า
    </h2>
    <div class="flex justify-center">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr class="bg-green-300 text-left border-b">
              <th class="p-3 px-5">ลำดับ</th>
              <th class="p-3 px-5">เลขที่รับซื้อของ</th>
              <th class="p-3 px-5">ประเภท</th>
              <th class="p-3 px-5">ลักษณะ</th>
              <th class="p-3 px-5">ศักราชผู้ขาย</th>
              <th class="p-3 px-5">ขนาด</th>
              <th class="p-3 px-5">น้ำหนักหรือจำนวน</th>
              <th class="p-3 px-5">ได้มาจาก / หนทางใด</th>
              <th class="p-3 px-5">วันที่ซื้อหรือได้มา</th>
              <th class="p-3 px-5">ราคาซื้อ</th>
              <th class="p-3 px-5">ร้านที่ซื้อจาก / ใคร</th>
              <th class="p-3 px-5">ราคาขาย</th>
              <th class="p-3 px-5">วันที่ขายได้</th>
              <th class="p-3 px-5">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b hover:bg-green-100">
              <td class="p-3 px-5">1</td>
              <td class="p-3 px-5">123456</td>
              <td class="p-3 px-5">ประเภท A</td>
              <td class="p-3 px-5">ลักษณะ A</td>
              <td class="p-3 px-5">2564</td>
              <td class="p-3 px-5">10</td>
              <td class="p-3 px-5">5kg</td>
              <td class="p-3 px-5">ตลาด</td>
              <td class="p-3 px-5">01/01/2024</td>
              <td class="p-3 px-5">1000</td>
              <td class="p-3 px-5">ร้าน A</td>
              <td class="p-3 px-5">1500</td>
              <td class="p-3 px-5">05/01/2024</td>
              <td class="p-3 px-5">-</td>
            </tr>
            <!-- Additional rows go here -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
