<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
    viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE -->
    <circle cx="12" cy="12" r="0" fill="currentColor">
      <animate id="svgSpinnersPulseMultiple0" fill="freeze" attributeName="r" begin="0;svgSpinnersPulseMultiple2.end"
        calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"></animate>
      <animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersPulseMultiple2.end" calcMode="spline"
        dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"></animate>
    </circle>
    <circle cx="12" cy="12" r="0" fill="currentColor">
      <animate id="svgSpinnersPulseMultiple1" fill="freeze" attributeName="r"
        begin="svgSpinnersPulseMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99"
        values="0;11"></animate>
      <animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulseMultiple0.begin+0.2s" calcMode="spline"
        dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"></animate>
    </circle>
    <circle cx="12" cy="12" r="0" fill="currentColor">
      <animate id="svgSpinnersPulseMultiple2" fill="freeze" attributeName="r"
        begin="svgSpinnersPulseMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99"
        values="0;11"></animate>
      <animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulseMultiple0.begin+0.4s" calcMode="spline"
        dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"></animate>
    </circle>
  </svg>
</template>

<script>
export default {
  name: 'SvgSpinnersPulseMultiple'
}
</script>