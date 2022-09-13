import torch
import torch.nn as nn
from torch.utils.data import DataLoader
import torchvision.models as models
from torchvision import transforms
from PIL import Image
import sys
import warnings
warnings.filterwarnings("ignore", category=UserWarning) 


# Inference 할 이미지 (업로드 한 이미지)
# img_path = "C:/Study/Python/1/00003_6.jpg"
img_path = "python/1/" + sys.argv[1]

#모델 옵션 설정
batch_size = 64
# learning_rate = 0.0001
# num_epoch = 20
size = 64


class DigitResNet(nn.Module):
    def __init__(self):
        super(DigitResNet, self).__init__()
        # 사전 훈련된 resnet50 가져오기
        self.model = models.resnet50(weights='ResNet50_Weights.DEFAULT')
        # 10개 클래스로 바꾸기
        num_ftrs = self.model.fc.in_features
        self.model.fc = nn.Linear(num_ftrs, 10)

    def forward(self, x):
        return self.model(x)


class DigitData:
    def __init__(self, img_path, size):
        self.img_path = img_path
        self.size = (size, size)
        
        # 전체 데이터셋의 RGB 평균과 표준편차
        mean = [0.80048384, 0.44734452, 0.50106468]
        std = [0.22327253, 0.29523788, 0.24583565]
        self.transform = transforms.Compose([transforms.Resize(self.size), 
                                             transforms.ToTensor(),
                                             transforms.Normalize(mean=mean, std=std)])


    def __len__(self):
        return len(self.img_path)

    def __getitem__(self, idx):
        path_idx = img_path[idx]
        img = Image.open(img_path).convert('RGB')
        img = self.transform(img)
        target = int(img_path.split('/')[1][0])    # 임의로 '_'로 split 하고 target 값을 지정한 것임.(이미지 파일의 위치에 따라 다르게 적용해야 함)
        return img, target                         # upload 된 이미지는 어떤 식으로 처리할 지는 추후 결정해야 함


inference_data = DigitData(img_path, size)
inference_loader = DataLoader(inference_data, batch_size=batch_size)    # 데이터 전처리

device = torch.device("cpu")
model = DigitResNet().to(device)
model.load_state_dict(torch.load("Python/Digit_ResNet.pth", map_location=device))

classes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

model.eval()
with torch.inference_mode():
    for i, data in enumerate(inference_loader):
        X, y = data[0].to(device), data[1].to(device)

        outputs = model.forward(X) # 네트워크로부터 예측값 가져오기
        predicted = classes[outputs[0].argmax(0)]
        
# print(f"Predicted: {predicted}")
print(predicted)
