import os
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import torch
import torchvision
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms
from torch.utils.data.dataloader import DataLoader


#모델 옵션 설정
batch_size = 128
learning_rate = 0.0001
num_epoch = 20
size = 28


class CNN(nn.Module): #CNN 모델 구현
    def __init__(self):
    	# super함수는 CNN class의 부모 class인 nn.Module을 초기화
        super(CNN, self).__init__()
        
        # batch_size = 100
        self.layer = nn.Sequential(
            # [100,3,28,28] -> [100,16,24,24]
            nn.Conv2d(in_channels=3,out_channels=32,kernel_size=5),
            nn.ReLU(),
            
            # [100,16,24,24] -> [100,32,20,20]
            nn.Conv2d(in_channels=32,out_channels=64,kernel_size=5),
            nn.ReLU(),
            
            # [100,32,20,20] -> [100,32,10,10]
            nn.MaxPool2d(kernel_size=2,stride=2),
            
            # [100,32,10,10] -> [100,64,6,6]
            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=5),
            nn.ReLU(),
            
            # [100,64,6,6] -> [100,64,3,3]
            nn.MaxPool2d(kernel_size=2,stride=2)          
        )

        self.fc_layer = nn.Sequential(
        	# [100,64*3*3] -> [100,100]
            nn.Linear(128*3*3,128),                                              
            nn.ReLU(),
            # [100,100] -> [100,10]
            nn.Linear(128,10)                                                   
        )       
        
    def forward(self,x):
    	# self.layer에 정의한 연산 수행
        out = self.layer(x)
        # view 함수를 이용해 텐서의 형태를 [100,나머지]로 변환
        out = out.view(out.size(0),-1)
        # self.fc_layer 정의한 연산 수행    
        out = self.fc_layer(out)

        return out


class DigitData:
    def __init__(self, path, size=size, split='train'):
        self.path = path
        self.size = (size, size)       
        
        # 전체 데이터셋의 RGB 평균과 표준편차
        mean = [0.80048384, 0.44734452, 0.50106468]
        std = [0.22327253, 0.29523788, 0.24583565]
        self.transform = transforms.Compose([transforms.Resize(self.size), transforms.ToTensor(),
                                             transforms.Normalize(mean=mean, std=std)])

    def __len__(self):
        return len(self.image_files)

    def __getitem__(self, idx):
        path = os.path.join(self.path, self.image_files[idx])
        img = Image.open(path).convert('RGB')
        img = self.transform(img)
        target = int(self.image_files[idx].split('/')[0])
        return img, target


path = "Python\00035_1.jpg"

data = DigitData(path, size, 'number') #데이터 사이즈 및 이미지 저장 valid
data_loader = DataLoader(data, batch_size=batch_size, shuffle=True) #데이터 전처리

# device = "cuda" if torch.cuda.is_available() else "cpu"
device = torch.device("cpu")
torch.load("Python\model.pth", map_location='cpu')
model = CNN().to(device)
# model.load_state_dict(torch.load("Python\model.pth"))


correct = 0
total = 0

# evaluate model
# model.eval()

# with torch.no_grad():
#     for image,label in valid_loader: #valid_loader에 있는 이미지와 이미지에 대한 답을 꺼내 학습 돌리고 손실률 계산하여 저장
#         x = image.to(device)
#         y = label.to(device)

#         output = model.forward(x)
        
#         # torch.max함수는 (최댓값,index)를 반환 
#         _,output_index = torch.max(output,1)
        
#         # 전체 개수 += 라벨의 개수
#         total += label.size(0)
        
#         # 도출한 모델의 index와 라벨이 일치하면 correct에 개수 추가
#         correct += (output_index == y).sum().float()
    
#     # 정확도 도출
#     print("Accuracy of Test Data: {}%".format(100*correct/total))


print(model)
